import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Usuario {


    @Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` } } })
    usu_id: number;

    @Expose({ name: 'nombre' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` } } })
    usu_nombre: string;

    @Expose({ name: 'segundo_nombre' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro segundo_nombre es obligatorio` } } })
    usu_segdo_nombre: string;

    @Expose({ name: 'apellido' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro apellido es obligatorio` } } })
    usu_primer_apellido_usur: string;

    @Expose({ name: 'segundo_apellido' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro segundo_apellido es obligatorio` } } })
    usu_segdo_apellido_usur: string;

    @Expose({ name: 'telefono' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` } } })
    usu_telefono: string;

    @Expose({ name: 'direccion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` } } })
    usu_direccion: string;

    @Expose({ name: 'correo_electronico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro correo_electronico es obligatorio` } } })
    usu_email: string;

    @Expose({ name: 'documento' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro documento es obligatorio` } } })
    usu_tipodoc: number;

    @Expose({ name: 'genero' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro genero es obligatorio` } } })
    usu_genero: number;

    @Expose({ name: 'acudiente' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro acudiente es obligatorio` } } })
    usu_acudiente: number;

    constructor(data: Partial<Usuario>) {
        Object.assign(this, data);
        this.usu_id = 0;
        this.usu_nombre = "";
        this.usu_segdo_nombre = "";
        this.usu_primer_apellido_usur = "";
        this.usu_segdo_apellido_usur = "";
        this.usu_telefono = "";
        this.usu_direccion = "";
        this.usu_email = "";
        this.usu_tipodoc = 0;
        this.usu_genero = 0;
        this.usu_acudiente = 0;
    }
};