FROM node:18 as development

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install --frozen-lockfile --non-interactive && yarn cache clean

RUN yarn run build


################
## PRODUCTION ##
################

FROM node:18-alpine

WORKDIR /app

COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules ./node_modules
COPY ./package.json /app/

USER node

HEALTHCHECK --interval=60s --timeout=10s --retries=3 \
    CMD sh -c "wget -nv -t1 --spider http://localhost:$PORT/health" || exit 1

CMD ["yarn", "start"]