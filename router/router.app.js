import LogApp from "../log/log.app.js";
import CrudApp from "../crud/crud.app.js";
import {serviceModulesApp} from "../service/service.modules.app.js";

const crudApp = new CrudApp()
const bodyParser = serviceModulesApp.bodyParser
const routerUser = serviceModulesApp.router
const routerBook = serviceModulesApp.router

// setting middle ware
routerUser.use(bodyParser.json())
routerUser.use(bodyParser.urlencoded({extended:true}))
routerBook.use(bodyParser.json())
routerBook.use(bodyParser.urlencoded({extended:true}))


routerUser.post('/login' , async (req,res) => {
    try {

        const username = req.body.username
        const password = req.body.password

        await crudApp.login(username,password).then((result) => {
            /*
                LogApp.winstonLogging.debug(result.localeCompare('password user hasn\'t matched'))
                LogApp.winstonLogging.debug(result.localeCompare('password user is matched'))
                LogApp.winstonLogging.debug(result.localeCompare('user hasn\'t exited'))
                ** If it returns 0, Meaning string 1 equals string 2
            */
            if (result.localeCompare('password user is matched') === 0) {
                return res.status(202).json({
                    status: "accepted",
                    data: result
                })
            }
            else if (result.localeCompare('password user hasn\'t matched') === 0) {
                return res.status(401).json({
                    status: "unauthorized",
                    data: result
                })
            }
            else if (result.localeCompare('user hasn\'t exited') === 0) {
                return res.status(403).json({
                    status: "forbidden",
                    data: result
                })
            }

        }).catch( (e) => {
            LogApp.winstonLogging.warn(`cause from login(username,password) method async : ${e.message}`)
            throw e
        })

    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from /login async method (post) : ${e.message}`
        })
        throw e

    }

})


routerUser.post('/create' , async (req,res) => {
    try {

        const username = req.body.username
        const password = req.body.password
        // const roles = req.body.roles

        await crudApp.createUser(username,password).then((result) => {
            /*

            */
            if (result === false) {
                return res.status(406).json({
                    status: "not acceptable",
                    data: result
                })
            }
            else {
                return res.status(201).json({
                    status: "created",
                    data: result
                })
            }

        }).catch( (e) => {
            LogApp.winstonLogging.warn(`cause from createUser(username,password) method async : ${e.message}`)
            throw e
        })

    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from /create async method (post) : ${e.message}`
        })
        throw e

    }

})


routerBook.get('/books' , async (req,res) => {
    try {

        const username = req.body.username
        const password = req.body.password

        await crudApp.loginThenGetsBooks(username,password).then((result) => {

            if (typeof result === "string") { // check the result type
                LogApp.winstonLogging.info('result is type string')
                if (result.localeCompare('password user hasn\'t matched') === 0) {
                    return res.status(401).json({
                        status: "unauthorized",
                        data: result
                    })
                }
                else if (result.localeCompare('user hasn\'t exited') === 0) {
                    return res.status(403).json({
                        status: "forbidden",
                        data: result
                    })
                }

            } else {
                LogApp.winstonLogging.info('result is not type string')
                return res.status(200).json({
                    status: "ok",
                    data: result
                })
            }

        }).catch( (e) => {
            LogApp.winstonLogging.warn(`cause from loginThenReadsBooks(username,password) method async : ${e.message}`)
            throw e
        })

    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from /books async method (get) : ${e.message}`
        })
        throw e

    }

})



export const routers = {
    routerUser : routerUser ,
    routerBook : routerBook
}


