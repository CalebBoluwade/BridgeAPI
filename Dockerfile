FROM node:18.9.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /

CMD [ "npm" "run" "build:dev" ]
ENTRYPOINT [ "sh", "/entrypoint.sh" ]