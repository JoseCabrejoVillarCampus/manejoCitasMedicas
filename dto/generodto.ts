import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Genero {


    @Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` } } })
    gen_id: number;

    @Expose({ name: 'genero' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro genero es obligatorio` } } })
    gen_nombre: string;

    @Expose({ name: 'abreviatura' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro abreviatura es obligatorio` } } })
    gen_abreiatura: string;


    constructor(data: Partial<Genero>) {
        Object.assign(this, data);
        this.gen_id = 0;
        this.gen_nombre = "";
        this.gen_abreiatura = "";
        
    }
};