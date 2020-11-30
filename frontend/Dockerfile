# Build Step: 1 (build app in NodeJs container)
FROM node:15 AS builder

WORKDIR /usr/share/temp
COPY package.json .
COPY .eslintrc.js .
COPY .env .
COPY .env.development .
RUN npm install
COPY ./public/ ./public/
COPY ./src/ ./src/
RUN npm run-script build-local

# Build Step: 2 (deploy app in Nginx container)
FROM nginx:stable

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nodejs-basic.conf /etc/nginx/conf.d/nodejs-basic.conf
COPY ./nginx/mime.types /etc/nginx/conf.d/mime.types
COPY ./certificates/. /etc/nginx/ssl

WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/share/temp/dist .
CMD ["nginx", "-g", "daemon off;"]
