FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./backend/package*.json .
RUN npm ci --omit=dev

COPY ./backend/. .

EXPOSE 5000

CMD [ "node", "src/index.js" ]