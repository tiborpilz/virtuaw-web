FROM node:13.0.1-buster AS build
WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.17
COPY --from=build /app/dist/virtuaw-web /usr/share/nginx/html
