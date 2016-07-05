FROM node:6.2.2-slim

ENV APP_DIR "/opt/app"
ENV TMP_DIR "/var${APP_DIR}"

RUN mkdir -p "$APP_DIR" && mkdir -p "$TMP_DIR"
WORKDIR "$APP_DIR"

ENV NODE_ENV "development"

CMD ["npm", "start"]
