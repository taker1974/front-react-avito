FROM node:18.0.0-alpine
WORKDIR /front-react-avito
ENV PATH /front-react-avito/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
COPY src ./src
COPY public ./public
RUN npm install --silent
RUN npm run build
CMD ["npm", "start"]
