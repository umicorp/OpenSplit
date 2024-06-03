#!/usr/bin/env bash

npm run build
cd server || exit
tsc
cd ../ || exit
docker-compose build

rm -rf build
rm -rf server/serverBuild