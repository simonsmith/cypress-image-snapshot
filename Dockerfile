FROM cypress/base:18.16.0

RUN mkdir -p /home/cypress-image-snapshot
WORKDIR /home/cypress-image-snapshot

COPY . .

RUN corepack prepare yarn@3.5.0 --activate && \
    yarn set version 3.5.0
RUN yarn install
RUN yarn build

CMD ["yarn", "test:run"]
