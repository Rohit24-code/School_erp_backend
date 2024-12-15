 
 
import app from './app'
import config from './config/config'
import dataBaseService from './service/dataBaseService'
import logger from './util/logger'

const server = app.listen(config.PORT)

// we need to run some thing before this listen
// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        //database connection

        const connection = await dataBaseService.connect()

        logger.info('DATABASE_CONNECTION', {
            meta: {
                 
                CONNECTION_NAME: connection?.name
            }
        })

        logger.info(`application started`, {
            meta: {
                PORT: config.PORT,
                SERVER: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error('APPLICATION ERROR', { meta: err })

        server.close((error) => {
            if (error) {
                logger.error('Application Error', { meta: err })
            }

            process.exit(1)
        })
    }
})()
