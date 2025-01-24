FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
ENV CYPRESS_updateSnapshots=false
ENV CYPRESS_debugSnapshots=false

RUN apt-get update && apt-get install -y \
   curl \
   ca-certificates \
   gnupg \
   lsb-release \
   libgtk2.0-0t64 \
   libgtk-3-0t64 \
   libgbm-dev \
   libnotify-dev \
   libnss3 \
   libxss1 \
   libasound2t64 \
   libxtst6 \
   xauth \
   xvfb \
   fonts-liberation \
   fonts-dejavu-core \
   fontconfig \
   && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
   apt-get install -y nodejs

RUN node --version && npm --version

RUN corepack enable && \
   corepack prepare yarn@3.5.0 --activate

RUN mkdir -p /home/cypress-image-snapshot
WORKDIR /home/cypress-image-snapshot

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install

COPY . .

RUN yarn build

RUN fc-cache -f -v

CMD ["yarn", "test:run"]
