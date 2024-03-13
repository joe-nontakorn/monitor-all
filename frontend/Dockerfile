FROM nginx:1.25.4-alpine-slim

WORKDIR /app

COPY . /app

RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install vite && \
    npm install && \
    npm run build

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
