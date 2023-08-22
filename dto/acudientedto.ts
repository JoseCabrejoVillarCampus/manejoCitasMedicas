import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Acudiente {


    @Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` } } })
    acu_codigo: number;

    @Expose({ name: 'nombreAcudiente' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombreAcudiente es obligatorio` } } })
    acu_nombreCompleto: string;

    @Expose({ name: 'telefono' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` } } })
    acu_telefono: string;

    @Expose({ name: 'direccion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` } } })
    acu_direccion: string;

    constructor(data: Partial<Acudiente>) {
        Object.assign(this, data);
        this.acu_codigo = 0;
        this.acu_nombreCompleto = "";
        this.acu_telefono = "";
        this.acu_direccion = "";
        
    }
};