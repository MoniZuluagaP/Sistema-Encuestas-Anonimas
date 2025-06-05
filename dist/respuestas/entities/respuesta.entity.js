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
exports.Respuesta = void 0;
const encuesta_entity_1 = require("../../encuestas/entities/encuesta.entity");
const respuesta_abierta_entity_1 = require("../../respuestas-abiertas/entities/respuesta-abierta.entity");
const respuesta_opciones_entity_1 = require("../../respuestas-opciones/entities/respuesta-opciones.entity");
const typeorm_1 = require("typeorm");
let Respuesta = class Respuesta {
    id;
    encuesta;
    abiertas;
    opciones;
};
exports.Respuesta = Respuesta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Respuesta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => encuesta_entity_1.Encuesta, (encuesta) => encuesta.id),
    __metadata("design:type", encuesta_entity_1.Encuesta)
], Respuesta.prototype, "encuesta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_abierta_entity_1.RespuestaAbierta, (ra) => ra.respuesta),
    __metadata("design:type", Array)
], Respuesta.prototype, "abiertas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_opciones_entity_1.RespuestaOpcion, (ro) => ro.respuesta),
    __metadata("design:type", Array)
], Respuesta.prototype, "opciones", void 0);
exports.Respuesta = Respuesta = __decorate([
    (0, typeorm_1.Entity)()
], Respuesta);
//# sourceMappingURL=respuesta.entity.js.map