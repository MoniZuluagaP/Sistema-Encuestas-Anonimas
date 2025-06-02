"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestasAbiertasModule = void 0;
const common_1 = require("@nestjs/common");
const respuestas_abiertas_service_1 = require("./respuestas-abiertas.service");
const respuestas_abiertas_controller_1 = require("./respuestas-abiertas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const respuesta_entity_1 = require("../respuestas/entities/respuesta.entity");
const respuesta_abierta_entity_1 = require("./entities/respuesta-abierta.entity");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
let RespuestasAbiertasModule = class RespuestasAbiertasModule {
};
exports.RespuestasAbiertasModule = RespuestasAbiertasModule;
exports.RespuestasAbiertasModule = RespuestasAbiertasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                respuesta_abierta_entity_1.RespuestaAbierta,
                pregunta_entity_1.Pregunta,
                respuesta_entity_1.Respuesta,
            ])],
        controllers: [respuestas_abiertas_controller_1.RespuestasAbiertasController],
        providers: [respuestas_abiertas_service_1.RespuestasAbiertasService],
        exports: [respuestas_abiertas_service_1.RespuestasAbiertasService],
    })
], RespuestasAbiertasModule);
//# sourceMappingURL=respuestas-abiertas.module.js.map