FROM node:7.7.4-slim
ENV NODE_ENV "production"

RUN mkdir /app
COPY package.json yarn.lock /app/
RUN cd /app && yarn
COPY server.js /app/
COPY utils/* /app/utils/
CMD ["--config=/app/config.json"]
ENTRYPOINT ["node", "/app/server.js"]
