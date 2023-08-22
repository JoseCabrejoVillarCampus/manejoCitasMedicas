import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import dotenv from 'dotenv';
import {Usuario} from '../controllers/usuariodto.js';
import {Acudiente} from '../controllers/acudientedto.js';
import {Cita} from '../controllers/citadto.js';
import {Especialidad} from '../controllers/especialidaddot.js';
import {Consultorio} from '../controllers/consultoriodto.js';
import {Estado} from '../controllers/estado_citadto.js';
import {Genero} from '../controllers/generodto.js';
import {Documento} from '../controllers/tipo_documentodto.js';
import {Medico} from '../controllers/medicodto.js';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';

dotenv.config('../');
const appToken = Router();
const appVerify = Router();

const DTO = (p1) => {
    const match = {
        'usuarios': Usuario,
        'acudientes': Acudiente,
        'citas': Cita,
        'especialidades': Especialidad,
        'consultorios': Consultorio,
        'estados': Estado,
        'generos': Genero,
        'documentos': Documento,
        'medicos': Medico
    };
    const inst = match[p1];
    if(!inst) throw {status: 404, message: "Token solicitado no valido"}
    return { atributos: plainToClass(inst, {}, {ignoreDecorators: true}), class: inst}
};

appToken.use('/:collection' ,async(req,res)=>{
    try {
        let inst = DTO(req.params.collection).atributos;
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({},  classToPlain(inst)));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.status(201).send({status: 201,jwt});
    } catch (error) {
        res.status(404).send({status: 404,message: 'Token solicitado no existente'})
    }
});

appVerify.use("/", async(req,res, next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.status(400).send({status: 400, token: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData;
        next();
    } catch (error) {
        res.status(498).send({status: 498, token: "Token caducado"});
    }
})

export {
    appToken,
    appVerify,
    DTO
}