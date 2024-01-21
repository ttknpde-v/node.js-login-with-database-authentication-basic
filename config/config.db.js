import LogApp from "../log/log.app.js";
import path from "path";
import dotenv from 'dotenv'
import sequelize from 'sequelize'

class ConfigDb {
    constructor() {
        //** config the environment file
        dotenv.config({ path : path.resolve('./env/.env') }) // for some reason
        dotenv.config({ debug: true })
        LogApp.winstonLogging.info('ConfigDb\'s constructor is worked')
    }
    /*get sequelizeConfig() {
        return new sequelize(
            process.env.SQLL_DATABASE,
            process.env.SQLL_USERNAME,
            process.env.SQLL_PASSWORD,
            {
                /!* set different port *!/
                dialect : 'mysql' ,
                host: process.env.SQLL_HOST,
                port: process.env.SQLL_PORT,
                pool : {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        ) // ended new sequelize()
    }*/
    getSequelizeConfig(database) {
        return new sequelize(
            database,
            process.env.SQLL_USERNAME,
            process.env.SQLL_PASSWORD,
            {
                /* set different port */
                dialect : 'mysql' ,
                host: process.env.SQLL_HOST,
                port: process.env.SQLL_PORT,
                pool : {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        ) // ended new sequelize()
    }
}

/*
check to config. it was gonna good or bad
new ConfigDb().sequelizeConfig.authenticate().then(() => {
    LogApp.winstonLogging.info('connected successfully!!')
}).catch((error) => {
    LogApp.winstonLogging.debug('failed connect!!')
    throw error
})
*/

const cf = new ConfigDb()
export const configAndSequelize = {
    sequelize : sequelize ,
    sequelizeConnectDb : cf.sequelizeConfig ,
    getSequelizeConfig : cf.getSequelizeConfig
}