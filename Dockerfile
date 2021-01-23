FROM node:14.15.4-alpine3.12 as builder

WORKDIR /usr/src/app

# RUN npm install -g yarn
COPY package*.json yarn.lock /usr/src/app/
RUN yarn install

# Runtime image from here
FROM node:14.15.4-alpine3.12

EXPOSE 3412
WORKDIR /usr/src/app

# Copy node_modules from builder image
COPY --from=builder /usr/src/app .
ADD . /usr/src/app
RUN yarn build

CMD ["node", "dist/index.js"]
