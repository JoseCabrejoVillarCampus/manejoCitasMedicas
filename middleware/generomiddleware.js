import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {Parametros} from '../controllers/parametros.js';
import { Router } from "express";
import { validate } from 'class-validator';
const appMiddlewareGenerosVerify = Router();
const appDTODataGeneros = Router();
const appDTOParamGeneros= Router();

appMiddlewareGenerosVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(DTO("generos").class, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    console.log(payload);
    console.log(clone);
    req.data= undefined;
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});
appDTODataGeneros.use( async(req,res,next)=>{
    try {
        let data = plainToClass(DTO("generos").class, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});
appDTOParamGeneros.use("/:id", async (req, res, next)=>{
    try{
        let parametro = plainToClass(Parametros, req.params);
        await validate(parametro);
        next();
    }catch (error){
        res.status(error.status).send(error);
    }
});
export { 
    appMiddlewareGenerosVerify,
    appDTODataGeneros,
    appDTOParamGeneros    
};