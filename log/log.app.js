import path from 'path'
import process from 'process'
import { createLogger, format, transports } from 'winston'
class LogApp {
    static get winstonLogging() {
        return createLogger({
            level: 'silly',
            format: format.combine(
                // get current file for output with logging
                format.label({ label: path.basename(process.argv[1]) }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(format => `${format.timestamp} ${format.level} [${format.label}] : ${format.message}`)
            ),
            transports: [
                new transports.Console // get logging to console
            ]
        }) // createLogger({})
    }
}


export default LogApp