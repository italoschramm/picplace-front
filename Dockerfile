FROM node:19.5.0-alpine

# make the 'app' folder the current working directory
WORKDIR /app

RUN npm install express vue vue-server-renderer compression

RUN npm install express

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 80
CMD [ "npm", "start"]