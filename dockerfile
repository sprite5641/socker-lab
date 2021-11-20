FROM node:alpine

COPY ./package.json /app/
WORKDIR /app/

RUN npm i --production

COPY . /app/

EXPOSE 443
CMD [ "node", "app.js" ]
