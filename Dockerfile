FROM node:20-alpine AS base
WORKDIR /AIHelper

COPY ./package.json ./package.json
RUN npm install
ARG NGROK_AUTHTOKEN
RUN npx ngrok config add-authtoken $NGROK_AUTHTOKEN
COPY . .
EXPOSE 3000

CMD ["sh", "-c", "npm run webhook & npm run dev"]
