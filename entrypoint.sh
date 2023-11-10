#!/bin/sh

set -e

npm install ts-node tsc typescript

npm run build:dev

node DIST/index.js