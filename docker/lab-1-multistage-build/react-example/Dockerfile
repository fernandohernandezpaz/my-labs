# STAGE 1: Build(The compile app)
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# STAGE 2: Expose the compile app
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 90

CMD ["nginx", "-g", "daemon off;"]