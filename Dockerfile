FROM alpine AS artifacts
RUN apk add curl tar jq dtrx

WORKDIR /opt/fivem

# Big thanks to James - https://github.com/jrgrimshaw
RUN curl -s https://artifacts.jgscripts.com/json | jq -r .linuxDownloadLink | xargs -I {} curl "{}" -o fx.tar.xz && dtrx fx.tar.xz
RUN rm -rf ./fx/alpine/dev ./fx/alpine/proc ./fx/alpine/run ./fx/alpine/sys

FROM node:current-alpine AS build
COPY . /opt/fivem/core
WORKDIR /opt/fivem/core
RUN apk add pnpm && pnpm install
RUN pnpm run build
RUN find dist/server/prisma ! -name "schema.prisma" -type f -delete

FROM node:current-alpine AS server
LABEL maintainer="ThePawlow <business.shine939@passinbox.com>"
RUN apk add clang pnpm
RUN npm install -g npm

WORKDIR /opt/fivem/
COPY --from=artifacts /opt/fivem/fx/alpine server
COPY --from=build /opt/fivem/core/dist server-data/resources/fivem-ts
COPY server.cfg server-data
COPY entrypoint.sh server-data

WORKDIR /opt/fivem/server-data
RUN pnpm init && pnpm install prisma @prisma/client

RUN adduser -D -h /opt/fivem -s /sbin/nologin fivemuser && \
    chown -R fivemuser:fivemuser /opt/fivem

RUN chmod +x /opt/fivem/server-data/entrypoint.sh
USER fivemuser

EXPOSE 30120
ENTRYPOINT ["./entrypoint.sh"]