FROM node:13.01-alpine AS BUILD
WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY . /app

RUN npm run build
