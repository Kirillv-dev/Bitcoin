import logger from "../../config/logger";
import LoggerConstant from "./loggerConstant";
const winston = logger();

export default class Logger {
    static error(error: string, path:string, topic:string): void {
        winston.log({
            message: error,
            label: `${path}  ${topic}`,
            level: LoggerConstant.LOG_LEVEL_ERROR,
        });
    }

    static info(message: string, path:string, topic:string): void {
        winston.log({
            message, 
            label: `${path}  ${topic}()`,
            level: LoggerConstant.LOG_LEVEL_INFO,
        });
    }

    static debug(message: string, path:string, topic:string): void {
        winston.log({
            message: `###${message}`,
            label: `${path}  ${topic}`,
            level: LoggerConstant.LOG_LEVEL_DEBUG,
        });
    }
};
