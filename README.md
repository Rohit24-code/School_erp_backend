npm init -y

########HUSKY SETUP############
Do husky once you initialized the project with git
Adding husky a utility of git hub to set some rules while in staging for fromatting , errors etc.

npm i husky lint-staged -D installed as dev dependency

after it npx husky init

###########TYPESCRIPT SETUP############
npm i typescript -D

 <!-- we have to instalize ts.config.json  -->

npx tsc --init
now modify the file as per need

 <!-- Need types for node js -->

npm i -D @types/node
npm i ts-node -D

then dev is for development and start is for production
"dev":"nodemon src/index.ts",
"start": "node dist/index.js",

Thats all typescript is working fine, when ever we want build we have added in script as "dist":"npx tsc" which will make a folder as dist;

now on npm start we will have the same output

<!-- NOW folders for mvc architecture -->

ecosystem.config.js :- this file is for process manager pm library

<!-- NOW SETTING UP  COMMIT LINT TO FORCE PROPER COMMIT MESSAGE-->

we would need husky for it along with npm i @commitlint/cli @commitlint/config conventional -D

<!-- DOTENV -->

npm i dotenv-flow

npm i cross-env this helps to check if enviroment is production or testing and it is same on all systems

<!-- Prettier and eslint check before commiting code -->

"lint-staged": {
"\*.ts": [
"npm run lint:fix",
"npm run format:fix"
]
},

 <!-- npm i winston -->

this logger to used to store in file as well as logger
and we can use it for logging in production without any issue

Made a logger file in utils an then i have logger msg in my logs folder

<!--npm i source-map-support   -->

The source-map-support library provides better error stack traces by mapping the transpiled code (e.g., TypeScript, Babel output) back to the original source code. This can be especially helpful for debugging in Node.js.

to find the line on which error is happening while my app is live in production bcs as i am using typescript it will give me line of error of build so using this it will give me as per my code line no.

after installation go to tsconfig and enable "sourceMap": true,

added this in looger and its complete now

import \* as sourceMapSupport from 'source-map-support'

//linking trace support
sourceMapSupport.install()

<!-- COLORFUL TERMINAL  -->

npm i colorette
now let to logger file

const customMeta = util.inspect(meta, {
showHidden: false,
depth: null,
colors: true
})

    added colors true in  utils and the just yourCOlor(message)

<!-- DB -->
npm i winston-mongodb

const mongodbTransport = (): Array<MongoDBTransportInstance> => {
    return [
        new transports.MongoDB({
            level:'info',
            db: config.DATABASE_URL as string,
            metaKey:"meta",
            expireAfterSeconds:3600 * 24 * 30,
            collection:'application-logs'
        })
    ]
}

this makes a collection in mongodb and save in db collection which will remove in 30 days 


<!-- SKIPPED MIGRATION AS OF NOW  -->


<!-- check fo app health  -->


<!-- install npm i helmet  -->
used to save from cross site scripting and content security policy and many others



<!-- npm i cors  -->


<!-- DEDOS ATTACK  when sometime try to call api many many time (RATE LIMITING)-->
npm i rate-limiter-flexible



<!-- npm check updates  -->
it upgrades your package.json deps to the latest version ignoring specified versions

