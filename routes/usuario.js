import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareUsuariosVerify, appDTOParamUsuarios, appDTODataUsuarios} from '../middleware/usuariomiddleware.js';
import { processErrors } from '../common/Function.js';
import { Usuario } from '../controllers/usuariodto.js'
let storageUsuario = Router();

let db = await coneccion();
let usuario = db.collection("usuario");

storageUsuario.use(expressQueryBoolean());

const getUsuarioById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await usuario.aggregate([
            {
                $match: { "usu_id": parseInt(id) }
            },
            {
                $project: {
                    "codigoUsuario": "$usu_id",
                    "nombre": "$usu_nombre",
                    "segundoNombre": "$usu_segdo_nombre",
                    "apellido": "$usu_primer_apellido_usur",
                    "segundoApellido": "$usu_segdo_apellido_usur",
                    "telefono": "$usu_telefono",
                    "direccion": "$usu_direccion",
                    "email": "$usu_email",
                    "documento": "$usu_tipodoc",
                    "genero": "$usu_genero",
                    "acudiente": "$usu_acudiente"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getUsuarioAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await usuario.aggregate([
            {
                $project: {
                    "codigoUsuario": "$usu_id",
                    "nombre": "$usu_nombre",
                    "segundoNombre": "$usu_segdo_nombre",
                    "apellido": "$usu_primer_apellido_usur",
                    "segundoApellido": "$usu_segdo_apellido_usur",
                    "telefono": "$usu_telefono",
                    "direccion": "$usu_direccion",
                    "email": "$usu_email",
                    "documento": "$usu_tipodoc",
                    "genero": "$usu_genero",
                    "acudiente": "$usu_acudiente"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageUsuario.get("/", limitGet() ,appMiddlewareUsuariosVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getUsuarioById(id);
            res.send(data)
        }else {
            const data = await getUsuarioAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageUsuario.post("/", limitGet(), appMiddlewareUsuariosVerify, appDTODataUsuarios, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await usuario.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Usuario);

        res.send(err);
    }
});
storageUsuario.put("/:id?", limitGet(), appMiddlewareUsuariosVerify, appDTODataUsuarios , appDTOParamUsuarios, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await usuario.updateOne(
                { "usu_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageUsuario.delete("/:id?", limitGet(), appMiddlewareUsuariosVerify, appDTOParamUsuarios, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await usuario.deleteOne(
                { "usu_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageUsuario;