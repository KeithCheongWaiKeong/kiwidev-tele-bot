FROM node:18 as builder
WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build
RUN rm -rf node_modules

FROM node:18-alpine as production
WORKDIR /root/
RUN apk --no-cache add g++ make python3 ca-certificates
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
RUN npm ci --omit=dev

CMD node dist/app
