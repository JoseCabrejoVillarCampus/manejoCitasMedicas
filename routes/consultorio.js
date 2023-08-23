import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appDTOParamConsultorios, appMiddlewareConsultoriosVerify, appDTODataConsultorios} from '../middleware/consultoriomiddleware.js';
import { processErrors } from '../common/Function.js';
import { Consultorio } from '../controllers/consultoriodto.js'
let storageConsultorio = Router();

let db = await coneccion();
let consultorio = db.collection("consultorio");

storageConsultorio.use(expressQueryBoolean());

const getConsultorioById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await consultorio.aggregate([
            {
                $match: { "cons_codigo": parseInt(id) }
            },
            {
                $project: {
                    "codigoConsultorio": "$cons_codigo",
                    "consultorio": "$cons_nombre"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getConsultorioAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await consultorio.aggregate([
            {
                $project: {
                    "codigoConsultorio": "$cons_codigo",
                    "consultorio": "$cons_nombre"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageConsultorio.get("/", limitGet() ,appMiddlewareConsultoriosVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getConsultorioById(id);
            res.send(data)
        }else {
            const data = await getConsultorioAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageConsultorio.post("/", limitGet(), appMiddlewareConsultoriosVerify, appDTODataConsultorios, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await consultorio.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Consultorio);

        res.send(err);
    }
});
storageConsultorio.put("/:id?", limitGet(), appMiddlewareConsultoriosVerify, appDTODataConsultorios , appDTOParamConsultorios, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await consultorio.updateOne(
                { "cons_codigo": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageConsultorio.delete("/:id?", limitGet(), appMiddlewareConsultoriosVerify, appDTOParamConsultorios, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await consultorio.deleteOne(
                { "cons_codigo": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageConsultorio;