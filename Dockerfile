FROM node:16-alpine as build
WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH
COPY package.json package-lock.json webpack.config.js ./
COPY src ./src
COPY public ./public
RUN apk update
RUN apk add --no-cache python3
ENV PYTHON /usr/bin/python
RUN npm install
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=build /build/build/ /opt/web/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/conf.d/ /etc/nginx/conf.d/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
