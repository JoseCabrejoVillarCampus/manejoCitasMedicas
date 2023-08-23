import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareEstadosVerify, appDTOParamEstados, appDTODataEstados} from '../middleware/estado_citamiddleware.js';
import { processErrors } from '../common/Function.js';
import { Estado } from '../controllers/estado_citadto.js'
let storageEstado = Router();

let db = await coneccion();
let estado = db.collection("estado");

storageEstado.use(expressQueryBoolean());

const getGenerosById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await estado.aggregate([
            {
                $match: { "tipdoc_id": parseInt(id) }
            },
            {
                $project: {
                    "codigoDocumento": "$tipdoc_id",
                    "tipoDocumento": "$tipdoc_nombre",
                    "abreviatura": "$tipdoc_abreviatura"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getGenerosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await estado.aggregate([
            {
                $project: {
                    "codigoDocumento": "$tipdoc_id",
                    "tipoDocumento": "$tipdoc_nombre",
                    "abreviatura": "$tipdoc_abreviatura"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageEstado.get("/", limitGet() ,appMiddlewareEstadosVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getEstadosById(id);
            res.send(data)
        }else {
            const data = await getEstadosAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageEstado.post("/", limitGet(), appMiddlewareEstadosVerify, appDTODataEstados, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await estado.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Estado);

        res.send(err);
    }
});
storageEstado.put("/:id?", limitGet(), appMiddlewareEstadosVerify, appDTODataEstados , appDTOParamEstados, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await estado.updateOne(
                { "tipdoc_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageEstado.delete("/:id?", limitGet(), appMiddlewareEstadosVerify, appDTOParamEstados, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await estado.deleteOne(
                { "tipdoc_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageEstado;