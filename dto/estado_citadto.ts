import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Estado {


    @Expose({ name: 'estado_cita' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estado_cita es obligatorio` } } })
    estcita_id: number;

    @Expose({ name: 'nombre_citado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre_citado es obligatorio` } } })
    estcita_nombre: number;

    constructor(data: Partial<Estado>) {
        Object.assign(this, data);
        this.estcita_id = 0;
        this.estcita_nombre = 0;
    }
};