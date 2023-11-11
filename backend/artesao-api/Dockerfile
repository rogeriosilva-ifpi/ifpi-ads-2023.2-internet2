FROM node:20.6.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# REF:
# https://medium.com/@sujan.dumaru.official/dockerizing-nestjs-application-c4b25139fe4c