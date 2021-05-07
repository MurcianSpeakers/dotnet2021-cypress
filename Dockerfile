FROM node:14-alpine AS build-spa
COPY ["package.json", "app/package.json"]
COPY ["yarn.lock", "app/yarn.lock"]
WORKDIR /app
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine AS final
EXPOSE 80
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-spa /app/nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build-spa /app/scripts/config/generate-config.sh ./generate-config.sh
COPY --from=build-spa /app/build /usr/share/nginx/html
RUN chmod +x generate-config.sh
RUN sed -i -e 's/\r$//' generate-config.sh
ENTRYPOINT ["/bin/sh", "-c", "./generate-config.sh > /usr/share/nginx/html/config.js && nginx -c /etc/nginx/nginx.conf -g 'daemon off;'"]
