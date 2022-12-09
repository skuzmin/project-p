FROM node:12

WORKDIR /user/share/app
COPY package.json .
RUN npm install

COPY migrations.js .
COPY migrations/ ./migrations/

COPY index.js .
COPY app/ ./app/

CMD npm start
