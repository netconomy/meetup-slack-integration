FROM node:7.7.4-slim
ENV NODE_ENV "production"

RUN mkdir /app
COPY package.json /app
RUN cd /app && npm install --production
COPY server.js /app/
COPY utils/* /app/utils/
CMD ["--config config.json"]
ENTRYPOINT ["node", "/app/server.js"]
