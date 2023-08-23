import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareAcudientesVerify, appDTODataAcudientes, appDTOParamAcudientes} from '../middleware/acudientemiddleware.js';
import { processErrors } from '../common/Function.js';
import { Acudiente } from '../controllers/acudientedto.js'
let storageAcudiente = Router();

let db = await coneccion();
let acudiente = db.collection("acudiente");

storageAcudiente.use(expressQueryBoolean());

const getAcudienteById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await acudiente.aggregate([
            {
                $match: { "acu_codigo": parseInt(id) }
            },
            {
                $project: {
                    "codigoAcudiente": "$acu_codigo",
                    "nombreAcudiente": "$acu_nombreCompleto",
                    "telefono": "$acu_telefono",
                    "direccion": "$acu_direccion"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getAcudienteAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await acudiente.aggregate([
            {
                $project: {
                    "codigoAcudiente": "$acu_codigo",
                    "nombreAcudiente": "$acu_nombreCompleto",
                    "telefono": "$acu_telefono",
                    "direccion": "$acu_direccion"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageAcudiente.get("/", limitGet() ,appMiddlewareAcudientesVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getAcudienteById(id);
            res.send(data)
        }else {
            const data = await getAcudienteAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageAcudiente.post("/", limitGet(), appMiddlewareAcudientesVerify, appDTODataAcudientes, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await acudiente.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Acudiente);

        res.send(err);
    }
});
storageAcudiente.put("/:id?", limitGet(), appMiddlewareAcudientesVerify, appDTODataAcudientes , appDTOParamAcudientes, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await acudiente.updateOne(
                { "acu_codigo": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageAcudiente.delete("/:id?", limitGet(), appMiddlewareAcudientesVerify, appDTOParamAcudientes, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await acudiente.deleteOne(
                { "acu_codigo": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageAcudiente;