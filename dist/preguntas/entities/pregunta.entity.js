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
exports.Pregunta = exports.TipoRespuesta = void 0;
const encuesta_entity_1 = require("../../encuestas/entities/encuesta.entity");
const opciones_entity_1 = require("../../opciones/entities/opciones.entity");
const respuesta_abierta_entity_1 = require("../../respuestas-abiertas/entities/respuesta-abierta.entity");
const typeorm_1 = require("typeorm");
var TipoRespuesta;
(function (TipoRespuesta) {
    TipoRespuesta["ABIERTA"] = "ABIERTA";
    TipoRespuesta["OPCION_SIMPLE"] = "OPCION_MULTIPLE_SELECCION_SIMPLE";
    TipoRespuesta["OPCION_MULTIPLE"] = "OPCION_MULTIPLE_SELECCION_MULTIPLE";
})(TipoRespuesta || (exports.TipoRespuesta = TipoRespuesta = {}));
let Pregunta = class Pregunta {
    id;
    numero;
    texto;
    tipo;
    encuesta;
    opciones;
    respuestasAbiertas;
};
exports.Pregunta = Pregunta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pregunta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pregunta.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pregunta.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoRespuesta }),
    __metadata("design:type", String)
], Pregunta.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => encuesta_entity_1.Encuesta, (encuesta) => encuesta.preguntas, { onDelete: 'CASCADE' }),
    __metadata("design:type", encuesta_entity_1.Encuesta)
], Pregunta.prototype, "encuesta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opciones_entity_1.Opcion, opcion => opcion.pregunta),
    __metadata("design:type", Array)
], Pregunta.prototype, "opciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_abierta_entity_1.RespuestaAbierta, ra => ra.pregunta),
    __metadata("design:type", Array)
], Pregunta.prototype, "respuestasAbiertas", void 0);
exports.Pregunta = Pregunta = __decorate([
    (0, typeorm_1.Entity)()
], Pregunta);
//# sourceMappingURL=pregunta.entity.js.map