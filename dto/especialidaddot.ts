import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Especialidad {


    @Expose({ name: 'cod_especialidad' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro cod_especialidad es obligatorio` } } })
    esp_id: number;

    @Expose({ name: 'especialidad' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro especialidad es obligatorio` } } })
    esp_nombre: number;

    constructor(data: Partial<Especialidad>) {
        Object.assign(this, data);
        this.esp_id = 0;
        this.esp_nombre = 0;
        
    }
};