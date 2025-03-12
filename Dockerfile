# sudo docker build -t fivem-node-alpine .

FROM node:current-alpine AS builder
RUN apk --no-cache add curl tar jq

WORKDIR /opt/fivem

RUN curl -s https://artifacts.jgscripts.com/json | jq -r .linuxDownloadLink | xargs -I {} curl -O fx.tar.xz "{}"
RUN tar -xf fx.tar.xz