"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestasModule = void 0;
const common_1 = require("@nestjs/common");
const respuestas_service_1 = require("./respuestas.service");
const respuestas_controller_1 = require("./respuestas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const encuesta_entity_1 = require("../encuestas/entities/encuesta.entity");
const respuesta_entity_1 = require("./entities/respuesta.entity");
const respuesta_abierta_entity_1 = require("../respuestas-abiertas/entities/respuesta-abierta.entity");
const respuesta_opciones_entity_1 = require("../respuestas-opciones/entities/respuesta-opciones.entity");
const respuestas_abiertas_service_1 = require("../respuestas-abiertas/respuestas-abiertas.service");
const respuestas_opciones_service_1 = require("../respuestas-opciones/respuestas-opciones.service");
const respuestas_abiertas_module_1 = require("../respuestas-abiertas/respuestas-abiertas.module");
const respuestas_opciones_module_1 = require("../respuestas-opciones/respuestas-opciones.module");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
const opciones_entity_1 = require("../opciones/entities/opciones.entity");
let RespuestasModule = class RespuestasModule {
};
exports.RespuestasModule = RespuestasModule;
exports.RespuestasModule = RespuestasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                respuesta_entity_1.Respuesta,
                encuesta_entity_1.Encuesta,
                respuesta_abierta_entity_1.RespuestaAbierta,
                respuesta_opciones_entity_1.RespuestaOpcion,
                pregunta_entity_1.Pregunta,
                opciones_entity_1.Opcion,
            ]),
            respuestas_abiertas_module_1.RespuestasAbiertasModule,
            respuestas_opciones_module_1.RespuestasOpcionesModule,
        ],
        controllers: [respuestas_controller_1.RespuestasController],
        providers: [
            respuestas_service_1.RespuestasService,
            respuestas_abiertas_service_1.RespuestasAbiertasService,
            respuestas_opciones_service_1.RespuestasOpcionesService
        ],
        exports: [respuestas_service_1.RespuestasService]
    })
], RespuestasModule);
//# sourceMappingURL=respuestas.module.js.map