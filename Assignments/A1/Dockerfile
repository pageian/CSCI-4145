FROM node:7
WORKDIR /app
COPY package-lock.json /app
RUN npm install
COPY ./A1C/A1C.js /app
CMD node A1C.js
EXPOSE 3000
