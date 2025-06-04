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
exports.Encuesta = void 0;
const typeorm_1 = require("typeorm");
const pregunta_entity_1 = require("../../preguntas/entities/pregunta.entity");
const respuesta_entity_1 = require("../../respuestas/entities/respuesta.entity");
let Encuesta = class Encuesta {
    id;
    nombre;
    codigo_respuesta;
    codigo_resultados;
    fecha_vencimiento;
    email;
    preguntas;
    respuestas;
    activa;
};
exports.Encuesta = Encuesta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Encuesta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Encuesta.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Encuesta.prototype, "codigo_respuesta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Encuesta.prototype, "codigo_resultados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Encuesta.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Encuesta.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pregunta_entity_1.Pregunta, (pregunta) => pregunta.encuesta),
    __metadata("design:type", Array)
], Encuesta.prototype, "preguntas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => respuesta_entity_1.Respuesta, respuesta => respuesta.encuesta),
    __metadata("design:type", Array)
], Encuesta.prototype, "respuestas", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Encuesta.prototype, "activa", void 0);
exports.Encuesta = Encuesta = __decorate([
    (0, typeorm_1.Entity)()
], Encuesta);
//# sourceMappingURL=encuesta.entity.js.map