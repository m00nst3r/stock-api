FROM node:boron-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ /usr/src/app/
RUN npm install

COPY ./ /usr/src/app

RUN adduser -D app && chown -R app /usr/src/app

EXPOSE 3001
CMD [ "npm", "start" ]