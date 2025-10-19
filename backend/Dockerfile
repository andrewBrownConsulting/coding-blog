FROM node:25-alpine
COPY package.json /app/ 
COPY src/ /app/
COPY certs/ /app/certs/
WORKDIR /app/
RUN npm i 
RUN ls
CMD ["node","server.mjs"]
