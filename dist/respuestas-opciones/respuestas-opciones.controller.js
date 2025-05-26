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
exports.RespuestasOpcionesController = void 0;
const common_1 = require("@nestjs/common");
const respuestas_opciones_service_1 = require("./respuestas-opciones.service");
const create_respuestas_opcione_dto_1 = require("./dto/create-respuestas-opcione.dto");
const update_respuestas_opcione_dto_1 = require("./dto/update-respuestas-opcione.dto");
let RespuestasOpcionesController = class RespuestasOpcionesController {
    respuestasOpcionesService;
    constructor(respuestasOpcionesService) {
        this.respuestasOpcionesService = respuestasOpcionesService;
    }
    create(createRespuestasOpcioneDto) {
        return this.respuestasOpcionesService.create(createRespuestasOpcioneDto);
    }
    findAll() {
        return this.respuestasOpcionesService.findAll();
    }
    findOne(id) {
        return this.respuestasOpcionesService.findOne(+id);
    }
    update(id, updateRespuestasOpcioneDto) {
        return this.respuestasOpcionesService.update(+id, updateRespuestasOpcioneDto);
    }
    remove(id) {
        return this.respuestasOpcionesService.remove(+id);
    }
};
exports.RespuestasOpcionesController = RespuestasOpcionesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_respuestas_opcione_dto_1.CreateRespuestasOpcioneDto]),
    __metadata("design:returntype", void 0)
], RespuestasOpcionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RespuestasOpcionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RespuestasOpcionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_respuestas_opcione_dto_1.UpdateRespuestasOpcioneDto]),
    __metadata("design:returntype", void 0)
], RespuestasOpcionesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RespuestasOpcionesController.prototype, "remove", null);
exports.RespuestasOpcionesController = RespuestasOpcionesController = __decorate([
    (0, common_1.Controller)('respuestas-opciones'),
    __metadata("design:paramtypes", [respuestas_opciones_service_1.RespuestasOpcionesService])
], RespuestasOpcionesController);
//# sourceMappingURL=respuestas-opciones.controller.js.map