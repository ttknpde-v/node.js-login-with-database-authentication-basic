import {configAndSequelize} from "../config/config.db.js";

const { DataTypes} = configAndSequelize.sequelize
const getSequelizeConfigDb = configAndSequelize.getSequelizeConfig('bookstore') // for testing to change database name passed argument

const Book = getSequelizeConfigDb.define (
    'books' , {
        bid : {
            type : DataTypes.INTEGER ,
            primaryKey : true,
            autoIncrement: true
        } ,
        title : {
            type : DataTypes.STRING,
        },
        price : {
            type : DataTypes.DECIMAL,
        },
        sale : {
            type : DataTypes.DECIMAL,
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

export default Book