import pino from 'pino';

export const logger = pino({
  redact: ['password', 'request.body.password', 'request.body[*].*.*.password'],
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
    },
  },
});
