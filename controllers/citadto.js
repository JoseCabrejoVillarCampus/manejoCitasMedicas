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
export class Cita {
    constructor(data) {
        Object.assign(this, data);
        this.cit_codigo = 0;
        this.cit_fecha = 0;
        this.cit_estado = 0;
        this.cit_medico = 0;
        this.cit_datosUsuarios = 0;
    }
}
__decorate([
    Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro cod es obligatorio` }; } }),
    __metadata("design:type", Number)
], Cita.prototype, "cit_codigo", void 0);
__decorate([
    Expose({ name: 'fecha' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha es obligatorio` }; } }),
    __metadata("design:type", Number)
], Cita.prototype, "cit_fecha", void 0);
__decorate([
    Expose({ name: 'estado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro estado es obligatorio` }; } }),
    __metadata("design:type", Number)
], Cita.prototype, "cit_estado", void 0);
__decorate([
    Expose({ name: 'medico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro medico es obligatorio` }; } }),
    __metadata("design:type", Number)
], Cita.prototype, "cit_medico", void 0);
__decorate([
    Expose({ name: 'usuario' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro usuario es obligatorio` }; } }),
    __metadata("design:type", Number)
], Cita.prototype, "cit_datosUsuarios", void 0);
;
