FROM cypress/base:20.11.1

ENV CYPRESS_updateSnapshots=false
ENV CYPRESS_debugSnapshots=false

RUN mkdir -p /home/cypress-image-snapshot
WORKDIR /home/cypress-image-snapshot

COPY ./.yarnrc.yml .
COPY ./.yarn .
COPY . .

RUN corepack enable && \
    corepack prepare yarn@4.1.1 --activate && \
    yarn set version 4.1.1
RUN yarn install
RUN yarn build

CMD ["yarn", "test:run"]
