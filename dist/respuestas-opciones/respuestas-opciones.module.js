"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestasOpcionesModule = void 0;
const common_1 = require("@nestjs/common");
const respuestas_opciones_service_1 = require("./respuestas-opciones.service");
const respuestas_opciones_controller_1 = require("./respuestas-opciones.controller");
const opciones_entity_1 = require("../opciones/entities/opciones.entity");
const respuesta_opciones_entity_1 = require("./entities/respuesta-opciones.entity");
const typeorm_1 = require("@nestjs/typeorm");
const respuesta_entity_1 = require("../respuestas/entities/respuesta.entity");
let RespuestasOpcionesModule = class RespuestasOpcionesModule {
};
exports.RespuestasOpcionesModule = RespuestasOpcionesModule;
exports.RespuestasOpcionesModule = RespuestasOpcionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                respuesta_opciones_entity_1.RespuestaOpcion,
                opciones_entity_1.Opcion,
                respuesta_entity_1.Respuesta,
            ])],
        controllers: [respuestas_opciones_controller_1.RespuestasOpcionesController],
        providers: [respuestas_opciones_service_1.RespuestasOpcionesService],
        exports: [respuestas_opciones_service_1.RespuestasOpcionesService],
    })
], RespuestasOpcionesModule);
//# sourceMappingURL=respuestas-opciones.module.js.map