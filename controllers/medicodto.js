var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Medico {
    constructor(data) {
        Object.assign(this, data);
        this.med_nroMatriculaProsional = 0;
        this.med_nombreCompleto = "";
        this.med_consultorio = 0;
        this.med_especialidad = 0;
    }
}
__decorate([
    Expose({ name: 'matriculaMedica' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro matriculaMedica es obligatorio` }; } }),
    __metadata("design:type", Number)
], Medico.prototype, "med_nroMatriculaProsional", void 0);
__decorate([
    Expose({ name: 'nombreMedico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro nombreMedico es obligatorio` }; } }),
    __metadata("design:type", String)
], Medico.prototype, "med_nombreCompleto", void 0);
__decorate([
    Expose({ name: 'consultorio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro consultorio es obligatorio` }; } }),
    __metadata("design:type", Number)
], Medico.prototype, "med_consultorio", void 0);
__decorate([
    Expose({ name: 'especialidad' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro especialidad es obligatorio` }; } }),
    __metadata("design:type", Number)
], Medico.prototype, "med_especialidad", void 0);
;
