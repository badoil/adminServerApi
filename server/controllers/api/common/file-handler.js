
// const attachFileModel = require('../../../models/noticeAttachedFiles')
const config = require('../../../config')

module.exports.insertAttachedFiles = async (options, connection) => {
    try{
        var attachedFiles = options.attachedFiles
        var filesArray = [];
        for (var i=0; i<attachedFiles.length; i++){      
          var tempArray = [];
          var order = attachedFiles[i].contentOrder;
          var path = attachedFiles[i].path;
          tempArray.push(options.tableIndex)
          tempArray.push(options.tableName)      
          tempArray.push(path)
          tempArray.push(order)      
          tempArray.push(attachedFiles[i].fileName)      
          filesArray.push(tempArray);
        }   
        console.log('filesArray : ',filesArray)
      return await attachFileModel.insertAttachedFiles(filesArray, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }
  

module.exports.deleteAttachedFiles = async (options, connection) => {
    try{    
      return await attachFileModel.delete(options, connection)
    }
    catch (e) {
      throw new Error(e)
      // console.log(e)
    }
  }

  module.exports.deleteMultipleAttachedFiles = async (options, connection) => {
    try{    
      return await attachFileModel.deleteMultiple(options, connection)
    }
    catch (e) {
      throw new Error(e)
      // console.log(e)
    }
  }
  module.exports.deleteAttachedFileById = async (options, connection) => {
    try{    
      return await attachFileModel.deleteById(options, connection)
    }
    catch (e) {
      throw new Error(e)
      // console.log(e)
    }
  }
  
  

  module.exports.getAttachedFilesByIndex = async (options) => {
    // try{
    //   return await attachFileModel.getAttachedFilesByIndex({index:index})
    // }
    try{
      const files =  await attachFileModel.getAttachedFilesByIndex(options)
      return files.map(data => {
        data.path = data.path ? `${config.aws.s3.frontPath}/${data.path}` : null
        // data.thumb = data.path ? `${data.path.replace(config.aws.s3.originUserImage, config.aws.s3.thumbnailUserImage)}` : null
        return data
      })
      return files
    }
    catch (e) {
      throw new Error(e)
    }
  }
  
  
  


  module.exports.getAttachedFilesKeyByid = async (index) => {
    // try{
    //   return await attachFileModel.getAttachedFilesByIndex({index:index})
    // }
    try{
      console.log('getAttachedFilesByid in handler')

      const files =  await attachFileModel.getAttachedFilesById({index:index})
      // return files.map(data => {
      //   data.path = data.path ? `${config.aws.s3.frontPath}/${data.path}` : null
      //   // data.thumb = data.path ? `${data.path.replace(config.aws.s3.originUserImage, config.aws.s3.thumbnailUserImage)}` : null
      //   return data
      // })
      return files
    }
    catch (e) {
      throw new Error(e)
    }
  }
  
  