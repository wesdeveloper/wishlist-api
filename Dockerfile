FROM node:14.16.0-alpine
ENV NODE_ENV development

WORKDIR /app

COPY . .
RUN npm install --development --silent
RUN npm run build

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
