import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Consultorio {


    @Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` } } })
    cons_codigo: number;

    @Expose({ name: 'nombre' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` } } })
    cons_nombre: number;


    constructor(data: Partial<Consultorio>) {
        Object.assign(this, data);
        this.cons_codigo = 0;
        this.cons_nombre = 0;
    }
};