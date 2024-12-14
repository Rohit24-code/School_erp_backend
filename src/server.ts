import app from "./app";
import config from "./config/config";

const server = app.listen(config.PORT);

// we need to run some thing before this listen
(()=>{
try {
    //database connection

    console.info(`application started`,{
        meta:{
            PORT:config.PORT,
            SERVER:config.SERVER_URL
        }
    })
} catch (error) {
    console.error("APPLICATION ERROR",{meta:error})

    server.close((error)=>{
        if(error){
            console.error("Application Error",{meta:error})
        }

        process.exit(1)
    })
}
})()