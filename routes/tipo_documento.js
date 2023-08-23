import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareDocumentosVerify, appDTOParamDocumentos, appDTODataDocumentos} from '../middleware/tipo_documentomiddleware.js';
import { processErrors } from '../common/Function.js';
import { Documento } from '../controllers/tipo_documentodto.js'
let storageDocumento = Router();

let db = await coneccion();
let documentos = db.collection("documentos");

storageDocumento.use(expressQueryBoolean());

const getDocumentosById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await documentos.aggregate([
            {
                $match: { "estcita_id": parseInt(id) }
            },
            {
                $project: {
                    "codigoEstado": "$estcita_id",
                    "estado": "$estcita_nombre"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getDocumentosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await documentos.aggregate([
            {
                $project: {
                    "codigoEstado": "$estcita_id",
                    "estado": "$estcita_nombre"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageDocumento.get("/", limitGet() ,appMiddlewareDocumentosVerify ,async(req, res)=>{
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


storageDocumento.post("/", limitGet(), appMiddlewareDocumentosVerify, appDTODataDocumentos, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await documentos.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Documento);

        res.send(err);
    }
});
storageDocumento.put("/:id?", limitGet(), appMiddlewareDocumentosVerify, appDTODataDocumentos , appDTOParamDocumentos, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await documentos.updateOne(
                { "estcita_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageDocumento.delete("/:id?", limitGet(), appMiddlewareDocumentosVerify, appDTOParamDocumentos, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await documentos.deleteOne(
                { "estcita_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageDocumento;