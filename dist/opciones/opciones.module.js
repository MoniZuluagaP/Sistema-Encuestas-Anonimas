"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpcionesModule = void 0;
const common_1 = require("@nestjs/common");
const opciones_service_1 = require("./opciones.service");
const opciones_controller_1 = require("./opciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
const opciones_entity_1 = require("./entities/opciones.entity");
let OpcionesModule = class OpcionesModule {
};
exports.OpcionesModule = OpcionesModule;
exports.OpcionesModule = OpcionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([opciones_entity_1.Opcion, pregunta_entity_1.Pregunta])],
        controllers: [opciones_controller_1.OpcionesController],
        providers: [opciones_service_1.OpcionesService],
        exports: [opciones_service_1.OpcionesService]
    })
], OpcionesModule);
//# sourceMappingURL=opciones.module.js.map