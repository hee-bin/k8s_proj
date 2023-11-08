# Node.js official image를 베이스 이미지로 사용
FROM node:14

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# Node.js 의존성 복사 및 설치 (package.json과 package-lock.json)
COPY package*.json ./
RUN npm install

# MySQL 클라이언트 설치
RUN apt-get update && apt-get install -y mysql-client

# 소스 코드 복사 (app.js)
COPY . .

# 애플리케이션 실행
CMD ["node", "app.js"]
