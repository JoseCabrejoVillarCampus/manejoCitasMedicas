import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Medico {


    @Expose({ name: 'matriculaMedica' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro matriculaMedica es obligatorio` } } })
    med_nroMatriculaProsional: number;

    @Expose({ name: 'nombreMedico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombreMedico es obligatorio` } } })
    med_nombreCompleto: string;

    @Expose({ name: 'consultorio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro consultorio es obligatorio` } } })
    med_consultorio: number;

    @Expose({ name: 'especialidad' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro especialidad es obligatorio` } } })
    med_especialidad: number;

    constructor(data: Partial<Medico>) {
        Object.assign(this, data);
        this.med_nroMatriculaProsional = 0;
        this.med_nombreCompleto = "";
        this.med_consultorio = 0;
        this.med_especialidad = 0;
        
    }
};