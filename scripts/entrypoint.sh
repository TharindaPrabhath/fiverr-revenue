#!/bin/sh

cd /usr/src/app/
ls -lrt /usr/src/app/


NODE_ENV=$NODE_ENV APP_ENV=$APP_ENV node dist/main


#NODE_ENV=$NODE_ENV APP_ENV=$APP_ENV pm2 start npm --name "pnp-services-api" --no-daemon --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z" -- start

