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
export class Documento {
    constructor(data) {
        Object.assign(this, data);
        this.tipdoc_id = 0;
        this.tipdoc_nombre = "";
        this.tipdoc_abreviatura = "";
    }
}
__decorate([
    Expose({ name: 'cod' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro code es obligatorio` }; } }),
    __metadata("design:type", Number)
], Documento.prototype, "tipdoc_id", void 0);
__decorate([
    Expose({ name: 'tipo' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro tipo es obligatorio` }; } }),
    __metadata("design:type", String)
], Documento.prototype, "tipdoc_nombre", void 0);
__decorate([
    Expose({ name: 'abreviatura' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro abreviatura es obligatorio` }; } }),
    __metadata("design:type", String)
], Documento.prototype, "tipdoc_abreviatura", void 0);
;
