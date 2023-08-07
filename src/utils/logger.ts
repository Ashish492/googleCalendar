import { pino } from "pino";
export const logger=pino({
    transport:{
        target:"pino-pretty",
        options:{
            translateTime:"SYS:yyyy-mm-dd'T'HH:MM:ss",
            ignore:"pid,hostname",

        }
    }
})