#!/usr/bin/env bash

while getopts "p" f
do
  case "$f" in
    p) prod="true"};;
    *) echo "usage: $0 -p Release Type. Default dev" >&2
       exit 1 ;;
  esac
done

npm run build
cd server || exit
tsc
cd ../ || exit

if [ -z "${prod}" ]; then
  echo "Dev Build"
  docker-compose build
else
  echo "Prod Build"
#  docker build --platform linux/amd64  .

  docker build --platform linux/amd64 -t ghcr.io/umicorp/opensplit:latest .
#  echo $CR_PAT | docker login ghcr.io -u umizoom --password-stdin
  docker image push ghcr.io/umicorp/opensplit:latest
fi

rm -rf build
rm -rf server/serverBuild