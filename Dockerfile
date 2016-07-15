FROM alpine:3.4

RUN apk add --no-cache nodejs bash

ENV APP_DIR "/opt/app"
ENV TMP_DIR "/var${APP_DIR}"

RUN mkdir -p "$APP_DIR" && mkdir -p "$TMP_DIR"
WORKDIR "$APP_DIR"

ENV NODE_ENV "development"

CMD ["npm", "run", "test"]
