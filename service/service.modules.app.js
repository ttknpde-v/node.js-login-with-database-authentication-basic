import express from "express";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt'
export const serviceModulesApp = {
    express : express,
    app : express() ,
    router : express.Router() ,
    bcrypt : bcrypt ,
    bodyParser : bodyParser
}