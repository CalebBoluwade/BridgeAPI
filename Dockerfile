FROM node:20.9-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 2341

COPY . .

COPY entrypoint.sh /

ENTRYPOINT [ "sh", "entrypoint.sh" ]

CMD [ "npm", "run", "build:dev" ]