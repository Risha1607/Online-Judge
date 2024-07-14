FROM node:18-alpine
WORKDIR /app/backend
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8000
CMD [ "node","index.js"]





