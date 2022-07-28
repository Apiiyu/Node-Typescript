import pino from "pino";
import dayjs from "dayjs";

const logger = pino({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    }
  },
})

export default logger