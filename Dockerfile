FROM node:alpine3.15
COPY . /app
WORKDIR /app
CMD ["npm", "start"]

