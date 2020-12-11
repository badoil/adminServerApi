FROM keymetrics/pm2:10-alpine
# FROM node:7.8

# RUN apt-get update && apt-get install -y build-essential python

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 2000:2000

WORKDIR /app

COPY ./package*.json ./
# RUN npm i --production
# RUN sudo apt-get update
# RUN sudo apt-get install -y build-essential python
RUN npm i --production

COPY ./ ./

CMD ["sh", "-c", "NODE_ENV=$NODE_ENV node ./server/bin/www"]
