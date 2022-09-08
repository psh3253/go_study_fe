FROM node:16-buster-slim
COPY package.json .
ADD . .
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]