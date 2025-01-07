FROM node:18

WORKDIR /cloudapp/server
COPY . .
RUN npm ci

EXPOSE 8000
ENTRYPOINT [ "node", "server.js" ]