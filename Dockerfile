FROM node:20.9-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /

CMD [ "npm", "run", "build:dev" ]
ENTRYPOINT [ "sh", "/entrypoint.sh" ]