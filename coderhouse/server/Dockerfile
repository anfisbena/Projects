FROM node:alpine
COPY . .
RUN npm install
RUN npm install -g nodemon
EXPOSE 8080
CMD ["npm", "start"]