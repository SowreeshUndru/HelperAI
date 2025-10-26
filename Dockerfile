FROM node:20-alpine AS base
WORKDIR /AIHelper

COPY ./package.json ./package.json
RUN npm install

COPY . .
EXPOSE 3000

CMD ["sh", "-c", "npm run webhook & npm run dev"]
