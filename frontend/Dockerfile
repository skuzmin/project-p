FROM nginx:stable

COPY nginx.conf /etc/nginx/nginx.conf
COPY nodejs-basic.conf /etc/nginx/conf.d/nodejs-basic.conf
COPY mime.types /etc/nginx/conf.d/mime.types
COPY ./certificates/. /etc/nginx/ssl

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

WORKDIR /usr/share/temp
COPY package.json .
COPY .eslintrc.js .
COPY .env .
COPY .env.development .
RUN npm install
COPY ./public/ ./public/
COPY ./src/ ./src/
RUN npm run-script build-local
RUN cp -a ./dist/. /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
