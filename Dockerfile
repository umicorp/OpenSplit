FROM node:alpine
LABEL authors="umaidabbasi"
ENV NODE_ENV="production"

WORKDIR /app
COPY package*.json ./
COPY nodemon.json ./
COPY build ./build
COPY server ./server
COPY start-docker.sh ./
RUN apk update && apk add bash

RUN npm install


ENTRYPOINT ["./start-docker.sh"]