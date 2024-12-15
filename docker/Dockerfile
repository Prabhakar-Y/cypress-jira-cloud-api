FROM cypress/included:13.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /app/mochawesome-report

CMD ["npm", "run", "test:headless"]
