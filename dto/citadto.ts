import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Cita {


    @Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro cod es obligatorio` } } })
    cit_codigo: number;

    @Expose({ name: 'fecha' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha es obligatorio` } } })
    cit_fecha: number;

    @Expose({ name: 'estado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estado es obligatorio` } } })
    cit_estado: number;

    @Expose({ name: 'medico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro medico es obligatorio` } } })
    cit_medico: number;

    @Expose({ name: 'usuario' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro usuario es obligatorio` } } })
    cit_datosUsuarios: number;


    constructor(data: Partial<Cita>) {
        Object.assign(this, data);
        this.cit_codigo = 0;
        this.cit_fecha = 0;
        this.cit_estado =  0;
        this.cit_medico = 0;
        this.cit_datosUsuarios = 0;
    }
};