FROM node:18-alpine
WORKDIR /app/compiler
RUN apk update && apk add --no-cache g++ python3 py3-pip openjdk11
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3001
CMD [ "node","index.js"]
