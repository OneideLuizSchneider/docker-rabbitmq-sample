# alpine versao bem simples e leve
FROM node:alpine

WORKDIR /opt/node-app/docker-rabbitmq-sample

COPY package*.json ./

VOLUME [ "/opt/node-app/docker-rabbitmq-sample" ]

RUN npm install

CMD [ "node", "consumer.js" ]