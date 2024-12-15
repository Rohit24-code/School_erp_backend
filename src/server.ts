import app from './app'
import config from './config/config'
import logger from './util/logger'

const server = app.listen(config.PORT)

// we need to run some thing before this listen
;(() => {
    try {
        //database connection

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
