import {configAndSequelize} from "../config/config.db.js";

const { DataTypes} = configAndSequelize.sequelize
const getSequelizeConfigDb = configAndSequelize.getSequelizeConfig('register') // for testing to change database name passed argument

const User = getSequelizeConfigDb.define (
    'users' , {
        uid : {
            type : DataTypes.INTEGER ,
            primaryKey : true,
            autoIncrement: true
        } ,
        username : {
            type : DataTypes.STRING,
        },
        password : {
            type : DataTypes.STRING,
        },
    }
    ,
    {
        // freeze name table not using *s on name
        freezeTableName: true ,
        // don't use createdAt/update
        timestamps: false
    }
)

export default User