FROM node:14

WORKDIR /practice/
COPY ./package.json /practice/
COPY ./yarn.lock /practice/
RUN yarn install

COPY . /practice/
CMD yarn start:dev 