FROM node:alpine
LABEL authors="umaidabbasi"
ENV NODE_ENV="production"

WORKDIR /app
COPY package*.json ./
COPY nodemon.json ./

RUN apk update && apk add bash

RUN npm install

COPY scripts ./scripts
COPY ./.env ./
COPY start-docker.sh ./

# Copy backend and frontend builds
COPY server/serverBuild ./server
COPY build ./build


ENTRYPOINT ["./start-docker.sh"]