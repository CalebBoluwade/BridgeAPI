#!/bin/sh

set -e

npm run build:dev

node DIST/index.js