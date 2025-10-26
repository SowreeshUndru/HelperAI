FROM node:20-alpine AS base
WORKDIR /AIHelper

COPY ./package.json ./package.json
RUN npm install
RUN npx ngrok config add-authtoken 34XqQrNtca0lxp3BTewQACQ66RI_2DbmAiMPD2L4JQJsgfKaz
COPY . .
EXPOSE 3000

CMD ["sh", "-c", "npm run webhook & npm run dev"]
