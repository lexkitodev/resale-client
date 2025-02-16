FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# The --host flag allows connections from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 