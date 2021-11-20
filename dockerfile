FROM node:alpine

COPY ./package.json /app/
WORKDIR /app/

RUN npm i --production

COPY . /app/

EXPOSE 8080
CMD [ "node", "app.js" ]
