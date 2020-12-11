'use strict'

const fs = require('fs')
const path = require('path')
const ApiRouter = require('../../controllers/default').ApiRouter
const schemas = require('../../schemas/index').entry
const pkg = require('../../../package')
const _ = require('lodash')

function generatePath(path, obj, swaggerPaths) {
  Object.keys(obj).forEach(key => {
    const ctrl = obj[key]
    if (ctrl instanceof ApiRouter) {
      let url
      if (typeof ctrl.name === 'string') {
        if (ctrl.name.length > 0) {
          const sub = ctrl.name.split('/').map(str => {
            if (str.indexOf(':') === 0) {
              str = str.replace(':', '')
              return `{${str}}`
            }
            return str
          }).join('/')
          url = `${path}/${sub}`
        }
        else {
          url = path
        }
      }
      else {
        url = `${path}/${key}`
      }
      if (ctrl.method) {
        if (!swaggerPaths.hasOwnProperty(url)) {
          swaggerPaths[url] = {}
        }
        const path = {
          tags: ctrl.tags,
          summary: ctrl.summary,
          description: ctrl.description,
          parameters: [...ctrl.parameters],
          responses: ctrl.responses
        }
        if (ctrl.path) {
          const schema = schemas[ctrl.schema]
          _.forEach(schema.properties, (value, key) => {
            // console.log(ctrl.path.length)
            for(let i = 0 ; i<ctrl.path.length ; i++){
              if(ctrl.path[i] === key){
                path.parameters.push({
                  in: 'path',
                  name: key,
                  required: true,
                  schema: schema.properties[key]
                })
              }
            }
          })
        }
        if (ctrl.schema) {
          if (['post', 'put'].includes(ctrl.method)) {
            const contentType = ctrl.contentType ? ctrl.contentType : 'application/json'
            const schema = schemas[ctrl.schema]
            path.requestBody = {content: {}}
            path.requestBody.content[contentType] = {schema: {$ref: `#/components/schemas/${ctrl.schema}`}}

            if(schema && ['put'].includes(ctrl.method) && ctrl.path){
              if(Object.keys(schema.properties).length === ctrl.path.length){
                delete path.requestBody
              }
            }
          }
          else {
            const schema = schemas[ctrl.schema]
            if (schema && schema.properties) {
              _.forEach(schema.properties, (value, key) => {
                if(ctrl.path){
                  // console.log(key)
                  // console.log(ctrl)
                  if(!ctrl.path.includes(key)){
                    path.parameters.push({
                      in: 'query',
                      name: key,
                      schema: schema.properties[key]
                    })
                  }
                }else{
                  path.parameters.push({
                    in: 'query',
                    name: key,
                    schema: schema.properties[key]
                  })
                }
              })
            }
          }
        }
        if (!ctrl.isPublic) {
          path.security = [{'bearerAuth': []}]
        }
        swaggerPaths[url][ctrl.method] = path
        // console.log(ctrl)
      }
    }
  })
}

function loadRoutes(dir, currentDir, swaggerPaths) {
  fs.readdirSync(dir)
      .forEach(target => {
        const targetDir = path.join(dir, target)
        const routePath = '/' + path.relative(currentDir, targetDir).replace(/\\/g, '/').replace('/index.js', '')

        if (fs.lstatSync(targetDir).isDirectory()) {
          loadRoutes(targetDir, currentDir, swaggerPaths)
        }
        else if (target === 'index.js') {
          const requirePath = path.relative(__dirname, targetDir)
          const middleware = require(`./${requirePath}`)
          generatePath(routePath, middleware, swaggerPaths)
        }
      })
  return swaggerPaths
}

const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }
}

const swagger = {
  openapi: '3.0.0',
  info: {
    title: `${pkg.name} ${process.env.NODE_ENV}`,
    description: `API Document for ${pkg.name} ${process.env.NODE_ENV}`,
    contact: {
      name: 'Marcus'
    },
    version: '0.1.0'
  },
  components: {
    schemas, securitySchemes
  },
}

swagger.servers = [{url: '/'}]

module.exports = () => {
  try {
    swagger.paths = loadRoutes(path.join(__dirname, '../../controllers'), path.join(__dirname, '../../controllers'), {})
    // console.log(swagger.components.schemas.UpdateViewCount)
    // console.log(swagger)
    return swagger
  }
  catch (err) {
    throw err
  }
}