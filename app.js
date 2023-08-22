import dotenv from 'dotenv';
import express from 'express';
import { appToken, appVerify } from './limit/token.js';
import storageAcudiente from './routes/acudiente.js';
import storageCita from './routes/cita.js';
import storageConsultorio from './routes/consultorio.js';
import storageEspecialidad from './routes/especialidad.js';
import storageEstado from './routes/estado_cita.js';
import storageGenero from './routes/genero.js';
import storageMedico from './routes/medico.js';
import storageDocumento from './routes/tipo_documento.js';
import storageUsuario from './routes/usuario.js'

dotenv.config();
let app = express();

app.use("/acudiente", appVerify, storageAcudiente);
app.use("/cita", appVerify, storageCita);
app.use("/consultorio", appVerify, storageConsultorio);
app.use("/especialidad", appVerify, storageEspecialidad);
app.use("/estado", appVerify, storageEstado);
app.use("/genero", appVerify, storageGenero);
app.use("/medico", appVerify, storageMedico);
app.use("/documento", appVerify, storageDocumento);
app.use("/usuario", appVerify, storageUsuario);
app.use("/token", appToken);


let config = JSON.parse(process.env.MY_SERVER);
console.log(config);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});

