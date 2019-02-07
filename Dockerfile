# alpine versao bem simples e leve
FROM node:alpine

WORKDIR /opt/node-app/docker-rabbitmq-sample

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "consumer.js", "node", "worker.js"]