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
export class Usuario {
    constructor(data) {
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
}
__decorate([
    Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` }; } }),
    __metadata("design:type", Number)
], Usuario.prototype, "usu_id", void 0);
__decorate([
    Expose({ name: 'nombre' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_nombre", void 0);
__decorate([
    Expose({ name: 'segundo_nombre' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro segundo_nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_segdo_nombre", void 0);
__decorate([
    Expose({ name: 'apellido' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro apellido es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_primer_apellido_usur", void 0);
__decorate([
    Expose({ name: 'segundo_apellido' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro segundo_apellido es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_segdo_apellido_usur", void 0);
__decorate([
    Expose({ name: 'telefono' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_telefono", void 0);
__decorate([
    Expose({ name: 'direccion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_direccion", void 0);
__decorate([
    Expose({ name: 'correo_electronico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro correo_electronico es obligatorio` }; } }),
    __metadata("design:type", String)
], Usuario.prototype, "usu_email", void 0);
__decorate([
    Expose({ name: 'documento' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro documento es obligatorio` }; } }),
    __metadata("design:type", Number)
], Usuario.prototype, "usu_tipodoc", void 0);
__decorate([
    Expose({ name: 'genero' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro genero es obligatorio` }; } }),
    __metadata("design:type", Number)
], Usuario.prototype, "usu_genero", void 0);
__decorate([
    Expose({ name: 'acudiente' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro acudiente es obligatorio` }; } }),
    __metadata("design:type", Number)
], Usuario.prototype, "usu_acudiente", void 0);
;
