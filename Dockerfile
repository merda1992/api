FROM node:20-alpine AS builder
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start:dev"]