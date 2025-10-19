FROM node:25-alpine
COPY package.json /app/
COPY next.config.ts /app/
COPY eslint.config.mjs /app/
COPY src/ /app/
# COPY .env /app/
WORKDIR /app/
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
