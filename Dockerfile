FROM node:alpine
LABEL authors="umaidabbasi"
#ENV NODE_ENV="production"

WORKDIR /app
COPY package*.json ./
COPY nodemon.json ./
COPY build ./build
COPY start-docker.sh ./
COPY .env-docker ./.env
COPY server ./server
RUN apk update && apk add bash

RUN npm install


ENTRYPOINT ["./start-docker.sh"]