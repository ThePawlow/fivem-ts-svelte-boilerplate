# sudo docker build -t fivem-node-alpine .

FROM node:current-alpine AS builder
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

ENTRYPOINT ["/bin/sh"]