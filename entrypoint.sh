#!/bin/sh

set -e

npm install ts-node tsc typescript

npm i -g pm2

pm2 start ./DIST/index.js --name BRIDGE_V1 -i max -o ./LOGS/SERVER.log -e ./LOGS/error/error.log -f