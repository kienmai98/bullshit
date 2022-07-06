# Mock API server
FROM node:alpine as mock-stage
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
CMD ["node", "./index.js"]
EXPOSE 3000