import { createLogger, transports, format } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnviroment } from '../constant/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'
import { blue, green, magenta, red, yellow } from 'colorette'

//linking trace support
sourceMapSupport.install()

const consoleLogFormat = format.printf((info) => {
    const { level, message, timeStamp, meta = {} } = info

    const customLabel = typeof level === 'string' ? colorizeLabel(level.toUpperCase()) : 'UNKNOWN_LABEL'
    const customTimeStamp = green(timeStamp as string)
    const customMessage = message
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const customLog = `${customLabel} [${customTimeStamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`

    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnviroment.PRODUCTION) return []
    return [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), consoleLogFormat)
        })
    ]
}

const colorizeLabel = (label: string) => {
    switch (label) {
        case 'ERROR':
            return red(label)
        case 'INFO':
            return blue(label)
        case 'WARN':
            return yellow(label)

        default:
            return label
    }
}

const fileLogFormat = format.printf((info) => {
    const { level, message, timeStamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}
    if (meta && typeof meta === 'object') {
        for (const [key, value] of Object.entries(meta)) {
            if (value instanceof Error) {
                logMeta[key] = {
                    name: value.name,
                    message: value.message,
                    trace: value.stack || ''
                }
            } else {
                logMeta[key] = value
            }
        }
    }
    const logData = {
        level: level?.toUpperCase(),
        message,
        timeStamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    //transport is something if you want at different places like file  , db, console
    transports: [...fileTransport(), ...consoleTransport()]
})
