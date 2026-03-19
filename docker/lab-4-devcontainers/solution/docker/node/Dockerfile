# STAGE 1: Build(The compile app)
FROM node:22-alpine

# Install git (Alpine uses apk, not apt — no bash required)
RUN apk add --no-cache git

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start"]