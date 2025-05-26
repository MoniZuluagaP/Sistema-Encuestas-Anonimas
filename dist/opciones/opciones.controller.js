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
exports.OpcionesController = void 0;
const common_1 = require("@nestjs/common");
const opciones_service_1 = require("./opciones.service");
const create_opcion_dto_1 = require("./dto/create-opcion.dto");
let OpcionesController = class OpcionesController {
    opcionesService;
    constructor(opcionesService) {
        this.opcionesService = opcionesService;
    }
    create(createOpcionDto) {
        return this.opcionesService.createOpcion(createOpcionDto);
    }
    async findOpcionesByPregunta(preguntaId) {
        return this.opcionesService.findOpcionesByPregunta(preguntaId);
    }
};
exports.OpcionesController = OpcionesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_opcion_dto_1.CreateOpcionDto]),
    __metadata("design:returntype", void 0)
], OpcionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/pregunta/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OpcionesController.prototype, "findOpcionesByPregunta", null);
exports.OpcionesController = OpcionesController = __decorate([
    (0, common_1.Controller)('opcion'),
    __metadata("design:paramtypes", [opciones_service_1.OpcionesService])
], OpcionesController);
//# sourceMappingURL=opciones.controller.js.map