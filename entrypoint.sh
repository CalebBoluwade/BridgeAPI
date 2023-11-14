#!/bin/sh

set -e

# /root/profile
set -o allexport; source .env; set +o allexport

npm install -g pm2 ts-node typescript

netstat -plant

which node # which docker

printenv

pwd && ls

# echo -e "--------------- STARTING APPLICATION --------------" | pm2 start ecosystem.config.js

echo -e "--------------- STARTING APPLICATION --------------" | npm run dev