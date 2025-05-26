"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaOpcion = void 0;
const opciones_entity_1 = require("../../opciones/entities/opciones.entity");
const respuesta_entity_1 = require("../../respuestas/entities/respuesta.entity");
const typeorm_1 = require("typeorm");
let RespuestaOpcion = class RespuestaOpcion {
    id;
    respuesta;
    opcion;
};
exports.RespuestaOpcion = RespuestaOpcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RespuestaOpcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => respuesta_entity_1.Respuesta, respuesta => respuesta.opciones, { onDelete: 'CASCADE' }),
    __metadata("design:type", respuesta_entity_1.Respuesta)
], RespuestaOpcion.prototype, "respuesta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opciones_entity_1.Opcion, opcion => opcion.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", opciones_entity_1.Opcion)
], RespuestaOpcion.prototype, "opcion", void 0);
exports.RespuestaOpcion = RespuestaOpcion = __decorate([
    (0, typeorm_1.Entity)()
], RespuestaOpcion);
//# sourceMappingURL=respuesta-opciones.entity.js.map