# sudo docker build -t fivem-node-alpine .

#FROM node:current-alpine AS builder
FROM alpine AS artifacts
RUN apk --no-cache add curl tar jq dtrx

WORKDIR /opt/fivem

RUN curl -s https://artifacts.jgscripts.com/json | jq -r .linuxDownloadLink | xargs -I {} curl "{}" -o fx.tar.xz && dtrx fx.tar.xz
RUN rm -rf ./fx/alpine/dev ./fx/alpine/proc ./fx/alpine/run ./fx/alpine/sys
# /opt/fivem/fx/alpine/opt/cfx-server/citizen/system_resources

#exec /opt/cfx-server/ld-musl-x86_64.so.1 \
#    --library-path "/usr/lib/v8/:/lib/:/usr/lib/" \
#    -- \
#    /opt/cfx-server/FXServer \
#        +set citizen_dir /opt/cfx-server/citizen/ \
#        $CONFIG_ARGS \
#        $*

FROM node:current-alpine AS build
COPY . /opt/fivem/core
WORKDIR /opt/fivem/core
RUN apk --no-cache add pnpm && pnpm install
RUN pnpm prisma generate && pnpm run build

FROM alpine AS server
WORKDIR /opt/fivem/
COPY --from=artifacts /opt/fivem/fx/alpine server
COPY --from=build /opt/fivem/core/dist server-data/resources/core
COPY --from=build /opt/fivem/core server-data/resources/core-src
COPY server.cfg server-data

EXPOSE 30120
ENTRYPOINT ["/bin/sh"]