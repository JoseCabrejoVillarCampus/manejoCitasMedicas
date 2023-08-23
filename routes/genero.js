import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareGenerosVerify, appDTOParamGeneros, appDTODataGeneros} from '../middleware/generomiddleware.js';
import { processErrors } from '../common/Function.js';
import { Genero } from '../controllers/generodto.js'
let storageGenero = Router();

let db = await coneccion();
let genero = db.collection("genero");

storageGenero.use(expressQueryBoolean());

const getGenerosById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await genero.aggregate([
            {
                $match: { "gen_id": parseInt(id) }
            },
            {
                $project: {
                    "codigoGenero": "$gen_id",
                    "genero": "$gen_nombre",
                    "abrebiatura": "$gen_abreiatura"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getGenerosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await genero.aggregate([
            {
                $project: {
                    "codigoGenero": "$gen_id",
                    "genero": "$gen_nombre",
                    "abrebiatura": "$gen_abreiatura"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageGenero.get("/", limitGet() ,appMiddlewareGenerosVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getGenerosById(id);
            res.send(data)
        }else {
            const data = await getGenerosAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageGenero.post("/", limitGet(), appMiddlewareGenerosVerify, appDTODataGeneros, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await genero.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Genero);

        res.send(err);
    }
});
storageGenero.put("/:id?", limitGet(), appMiddlewareGenerosVerify, appDTOParamGeneros , appDTODataGeneros, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await genero.updateOne(
                { "gen_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageGenero.delete("/:id?", limitGet(), appMiddlewareGenerosVerify, appDTOParamGeneros, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await genero.deleteOne(
                { "gen_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageGenero;