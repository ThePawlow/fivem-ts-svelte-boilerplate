#!/bin/sh
# npx prisma migrate dev --name init --schema /opt/fivem/server-data/resources/fivem-ts/server/prisma/schema.prisma
# npx prisma migrate deploy --schema /opt/fivem/server-data/resources/fivem-ts/server/prisma/schema.prisma

/opt/fivem/server/opt/cfx-server/ld-musl-x86_64.so.1 \
    --library-path "/opt/fivem/server/usr/lib/v8/:/opt/fivem/server/lib/:/opt/fivem/server/usr/lib/" \
    -- \
    /opt/fivem/server/opt/cfx-server/FXServer \
        +set citizen_dir /opt/fivem/server/opt/cfx-server/citizen \
        +exec server.cfg