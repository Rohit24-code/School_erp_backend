import app from './app'
import config from './config/config'

const server = app.listen(config.PORT)

// we need to run some thing before this listen
;(() => {
    try {
        //database connection

        // eslint-disable-next-line no-console
        console.info(`application started`, {
            meta: {
                PORT: config.PORT,
                SERVER: config.SERVER_URL
            }
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('APPLICATION ERROR', { meta: err })

        server.close((error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Application Error', { meta: err })
            }

            process.exit(1)
        })
    }
})()
