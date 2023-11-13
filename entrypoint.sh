#!/bin/sh

set -e

npm install ts-node tsc typescript

npm i -g pm2

pm2 start pm2.config.js