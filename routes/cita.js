import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareCitasVerify, appDTOParamCitas, appDTODataCitas} from '../middleware/citamiddleware.js';
import { processErrors } from '../common/Function.js';
import { Cita } from '../controllers/citadto.js'
let storageCita = Router();

let db = await coneccion();
let cita = db.collection("cita");

storageCita.use(expressQueryBoolean());

const getCitaById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await cita.aggregate([
            {
                $match: { "cit_codigo": parseInt(id) }
            },
            {
                $project: {
                    "codigoCita": "$cit_codigo",
                    "codigoFecha": "$cit_fecha",
                    "codigoEstado": "$cit_estado",
                    "codigoMedico": "$cit_medico",
                    "codigoUsusario": "$cit_datosUsuarios"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getCitaAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await cita.aggregate([
            {
                $project: {
                    "codigoCita": "$cit_codigo",
                    "codigoFecha": "$cit_fecha",
                    "codigoEstado": "$cit_estado",
                    "codigoMedico": "$cit_medico",
                    "codigoUsusario": "$cit_datosUsuarios"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageCita.get("/", limitGet() ,appMiddlewareCitasVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getCitaById(id);
            res.send(data)
        }else {
            const data = await getCitaAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageCita.post("/", limitGet(), appMiddlewareCitasVerify, appDTODataCitas, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await cita.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Cita);

        res.send(err);
    }
});
storageCita.put("/:id?", limitGet(), appMiddlewareCitasVerify, appDTODataCitas , appDTOParamCitas, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await cita.updateOne(
                { "cit_codigo": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageCita.delete("/:id?", limitGet(), appMiddlewareCitasVerify, appDTOParamCitas, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await cita.deleteOne(
                { "cit_codigo": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageCita;