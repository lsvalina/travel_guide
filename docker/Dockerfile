FROM node:20-alpine as BUILD_SERVER
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=BUILD_SERVER /app .
COPY docker/start.sh /app/start.sh
EXPOSE 3000
CMD ["/bin/sh", "-c", "/app/start.sh"]