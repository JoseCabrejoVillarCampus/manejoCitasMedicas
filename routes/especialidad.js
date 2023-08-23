import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareEspecialidadesVerify, appDTOParamEspecialidades, appDTODataEspecialidades} from '../middleware/especialidadmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Especialidad } from '../controllers/especialidaddot.js'
let storageEspecialidad = Router();

let db = await coneccion();
let especialidad = db.collection("especialidad");

storageEspecialidad.use(expressQueryBoolean());

const getEspecialidadesById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await especialidad.aggregate([
            {
                $match: { "esp_id": parseInt(id) }
            },
            {
                $project: {
                    "codigoEspecialidad": "$esp_id",
                    "nombreEspecialidad": "$esp_nombre"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getEspecialidadesAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await especialidad.aggregate([
            {
                $project: {
                    "codigoEspecialidad": "$esp_id",
                    "nombreEspecialidad": "$esp_nombre"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageEspecialidad.get("/", limitGet() ,appMiddlewareEspecialidadesVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getEspecialidadesById(id);
            res.send(data)
        }else {
            const data = await getEspecialidadesAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageEspecialidad.post("/", limitGet(), appMiddlewareEspecialidadesVerify, appDTODataEspecialidades, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await especialidad.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Especialidad);

        res.send(err);
    }
});
storageEspecialidad.put("/:id?", limitGet(), appMiddlewareEspecialidadesVerify, appDTODataEspecialidades , appDTOParamEspecialidades, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await especialidad.updateOne(
                { "esp_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageEspecialidad.delete("/:id?", limitGet(), appMiddlewareEspecialidadesVerify, appDTOParamEspecialidades, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await especialidad.deleteOne(
                { "esp_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageEspecialidad;