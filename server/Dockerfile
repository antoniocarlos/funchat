FROM node:16.13.1-alpine3.13 as base

WORKDIR /fun-chat-api/

COPY package.json package-lock.json .eslintrc.json .eslintignore jest.config.js babel.config.js .sequelizerc .env /fun-chat-api/

RUN apk update

RUN npm install

COPY src /fun-chat-api/src/

EXPOSE 4000

FROM base as development

CMD npm run dev
