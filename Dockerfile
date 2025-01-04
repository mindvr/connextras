FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

CMD rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/connextras/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
