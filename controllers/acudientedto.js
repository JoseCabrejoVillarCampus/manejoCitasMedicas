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
export class Acudiente {
    constructor(data) {
        Object.assign(this, data);
        this.acu_codigo = 0;
        this.acu_nombreCompleto = "";
        this.acu_telefono = "";
        this.acu_direccion = "";
    }
}
__decorate([
    Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` }; } }),
    __metadata("design:type", Number)
], Acudiente.prototype, "acu_codigo", void 0);
__decorate([
    Expose({ name: 'nombreAcudiente' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro nombreAcudiente es obligatorio` }; } }),
    __metadata("design:type", String)
], Acudiente.prototype, "acu_nombreCompleto", void 0);
__decorate([
    Expose({ name: 'telefono' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` }; } }),
    __metadata("design:type", String)
], Acudiente.prototype, "acu_telefono", void 0);
__decorate([
    Expose({ name: 'direccion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` }; } }),
    __metadata("design:type", String)
], Acudiente.prototype, "acu_direccion", void 0);
;
