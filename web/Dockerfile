# Node.js 환경에서 React 앱 빌드
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx에서 빌드된 React 앱 호스팅
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
