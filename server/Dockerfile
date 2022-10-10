FROM node:16.13.1-alpine3.13 as base

ARG JWT_SECRET

ENV JWT_SECRET=$JWT_SECRET

WORKDIR /fun-chat-api/

COPY package.json package-lock.json .eslintrc.json .eslintignore jest.config.js babel.config.js .sequelizerc .env /fun-chat-api/

RUN apk --virtual build-dependencies add --update --no-cache alpine-sdk python make g++

RUN apk add vips-dev fftw-dev build-base \
  --update-cache \
  --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community \
  --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/main \
  && rm -fR /var/cache/apk/*

RUN npm install

COPY src /fun-chat-api/src/

EXPOSE 4000

FROM base as development

CMD npm run dev

CMD npm rum seed
