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

Thats all typescript is working fine, when ever we want build we have added in script as  "dist":"npx tsc" which will make a folder as dist;

now on npm start we will have the same output


<!-- NOW folders for mvc architecture -->

ecosystem.config.js :- this file is for process manager pm library 

<!-- NOW SETTING UP  COMMIT LINT TO FORCE PROPER COMMIT MESSAGE-->
we would need husky for it along with npm i @commitlint/cli @commitlint/config conventional -D



<!-- DOTENV -->
npm i dotenv-flow

npm i cross-env  this helps to check if enviroment is production or testing and it is same on all systems 