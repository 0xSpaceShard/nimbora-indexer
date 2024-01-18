FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

RUN make checkpoint-gen

EXPOSE 3000

CMD ["yarn", "start"]