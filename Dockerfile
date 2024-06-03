FROM node:alpine
LABEL authors="umaidabbasi"
ENV NODE_ENV="production"

WORKDIR /app
COPY package*.json ./
COPY nodemon.json ./
COPY build ./build
COPY scripts ./scripts
COPY ./.env ./
COPY start-docker.sh ./
COPY server/serverBuild ./server
RUN apk update && apk add bash

RUN npm install


ENTRYPOINT ["./start-docker.sh"]