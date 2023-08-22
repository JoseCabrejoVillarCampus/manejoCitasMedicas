import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Documento {


    @Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` } } })
    tipdoc_id: number;

    @Expose({ name: 'tipo' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro tipo es obligatorio` } } })
    tipdoc_nombre: string;

    @Expose({ name: 'abreviatura' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro abreviatura es obligatorio` } } })
    tipdoc_abreviatura: string;


    constructor(data: Partial<Documento>) {
        Object.assign(this, data);
        this.tipdoc_id = 0;
        this.tipdoc_nombre = "";
        this.tipdoc_abreviatura = "";
    }
};