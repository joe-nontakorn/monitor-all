FROM node:18-alpine

WORKDIR /app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install


CMD [ "node", "/app/app.js" ]