import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareMedicosVerify, appDTOParamMedicos, appDTODataMedicos} from '../middleware/medicomiddleware.js';
import { processErrors } from '../common/Function.js';
import { Medico } from '../controllers/medicodto.js'
let storageMedico = Router();

let db = await coneccion();
let medico = db.collection("medico");

storageMedico.use(expressQueryBoolean());

const getMedicosById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await medico.aggregate([
            {
                $match: { "med_nroMatriculaProsional": parseInt(id) }
            },
            {
                $project: {
                    "matriculaMedica": "$med_nroMatriculaProsional",
                    "nombreMedico": "$med_nombreCompleto",
                    "consultorio": "$med_consultorio",
                    "especialidad": "$med_especialidad"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getMedicosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await medico.aggregate([
            {
                $project: {
                    "matriculaMedica": "$med_nroMatriculaProsional",
                    "nombreMedico": "$med_nombreCompleto",
                    "consultorio": "$med_consultorio",
                    "especialidad": "$med_especialidad"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageMedico.get("/", limitGet() ,appMiddlewareMedicosVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getMedicosById(id);
            res.send(data)
        }else {
            const data = await getMedicosAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageMedico.post("/", limitGet(), appMiddlewareMedicosVerify, appDTODataMedicos, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await medico.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        /* const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Medico);

        res.send(err); */
    }
});
storageMedico.put("/:id?", limitGet(), appMiddlewareMedicosVerify, appDTOParamMedicos , appDTODataMedicos, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await medico.updateOne(
                { "med_nroMatriculaProsional": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageMedico.delete("/:id?", limitGet(), appMiddlewareMedicosVerify, appDTOParamMedicos, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await medico.deleteOne(
                { "med_nroMatriculaProsional": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageMedico;