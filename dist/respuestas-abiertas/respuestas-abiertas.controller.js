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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestasAbiertasController = void 0;
const common_1 = require("@nestjs/common");
const respuestas_abiertas_service_1 = require("./respuestas-abiertas.service");
const create_respuestas_abiertas_dto_1 = require("./dto/create-respuestas-abiertas.dto");
let RespuestasAbiertasController = class RespuestasAbiertasController {
    respuestasAbiertasService;
    constructor(respuestasAbiertasService) {
        this.respuestasAbiertasService = respuestasAbiertasService;
    }
    create(createDto) {
        return this.respuestasAbiertasService.create(createDto);
    }
    findRespuestasAbiertasByRespuestaId(encuestaId) {
        return this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaId(+encuestaId);
    }
};
exports.RespuestasAbiertasController = RespuestasAbiertasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_respuestas_abiertas_dto_1.CreateRespuestaAbiertaDto]),
    __metadata("design:returntype", void 0)
], RespuestasAbiertasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('respuesta/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RespuestasAbiertasController.prototype, "findRespuestasAbiertasByRespuestaId", null);
exports.RespuestasAbiertasController = RespuestasAbiertasController = __decorate([
    (0, common_1.Controller)('respuestas-abiertas'),
    __metadata("design:paramtypes", [respuestas_abiertas_service_1.RespuestasAbiertasService])
], RespuestasAbiertasController);
//# sourceMappingURL=respuestas-abiertas.controller.js.map