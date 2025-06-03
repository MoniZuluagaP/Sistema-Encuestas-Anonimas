"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncuestasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const encuestas_service_1 = require("./encuestas.service");
const encuestas_controller_1 = require("./encuestas.controller");
const encuesta_entity_1 = require("./entities/encuesta.entity");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
const preguntas_service_1 = require("../preguntas/preguntas.service");
const opciones_entity_1 = require("../opciones/entities/opciones.entity");
const opciones_service_1 = require("../opciones/opciones.service");
const respuesta_entity_1 = require("../respuestas/entities/respuesta.entity");
const respuestas_service_1 = require("../respuestas/respuestas.service");
const respuesta_abierta_entity_1 = require("../respuestas-abiertas/entities/respuesta-abierta.entity");
const respuestas_abiertas_service_1 = require("../respuestas-abiertas/respuestas-abiertas.service");
const respuesta_opciones_entity_1 = require("../respuestas-opciones/entities/respuesta-opciones.entity");
const respuestas_opciones_service_1 = require("../respuestas-opciones/respuestas-opciones.service");
const email_module_1 = require("../email/email.module");
let EncuestasModule = class EncuestasModule {
};
exports.EncuestasModule = EncuestasModule;
exports.EncuestasModule = EncuestasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                encuesta_entity_1.Encuesta,
                pregunta_entity_1.Pregunta,
                opciones_entity_1.Opcion,
                respuesta_entity_1.Respuesta,
                respuesta_abierta_entity_1.RespuestaAbierta,
                respuesta_opciones_entity_1.RespuestaOpcion,
            ]),
            email_module_1.EmailModule,
        ],
        controllers: [encuestas_controller_1.EncuestasController],
        providers: [
            encuestas_service_1.EncuestasService,
            preguntas_service_1.PreguntasService,
            opciones_service_1.OpcionesService,
            respuestas_service_1.RespuestasService,
            respuestas_abiertas_service_1.RespuestasAbiertasService,
            respuestas_opciones_service_1.RespuestasOpcionesService,
        ],
    })
], EncuestasModule);
//# sourceMappingURL=encuestas.module.js.map