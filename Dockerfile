FROM cypress/base:20.10.0

ENV CYPRESS_updateSnapshots=false
ENV CYPRESS_debugSnapshots=false

RUN mkdir -p /home/cypress-image-snapshot
WORKDIR /home/cypress-image-snapshot

COPY . .

RUN corepack enable && \
    corepack prepare yarn@3.5.0 --activate && \
    yarn set version 3.5.0
RUN yarn install
RUN yarn build

CMD ["yarn", "test:run"]
