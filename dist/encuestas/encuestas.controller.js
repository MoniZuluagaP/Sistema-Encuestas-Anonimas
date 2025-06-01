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
exports.EncuestasController = void 0;
const common_1 = require("@nestjs/common");
const encuestas_service_1 = require("./encuestas.service");
const create_encuesta_dto_1 = require("./dto/create-encuesta.dto");
const update_encuesta_dto_1 = require("./dto/update-encuesta.dto");
let EncuestasController = class EncuestasController {
    encuestasService;
    constructor(encuestasService) {
        this.encuestasService = encuestasService;
    }
    startEncuesta() {
        return 'ACA DEBE IRSE ARMANDO LA ENCUESTA, ESTAN LOS CAMPOS PARA COMPLETAR Y CREAR LA ENCUESTA Y EL BOTON PARA HACER';
    }
    create(createEncuestaDto) {
        return this.encuestasService.create(createEncuestaDto);
    }
    findByCodigo(codigo) {
        return this.encuestasService.findByCodigo(codigo);
    }
    update(id, updateEncuestaDto) {
        return this.encuestasService.update(+id, updateEncuestaDto);
    }
    async removeEncuesta(id) {
        const eliminado = await this.encuestasService.remove(+id);
        if (!eliminado) {
            throw new common_1.NotFoundException(`Encuesta con id ${id} no encontrada`);
        }
        return { mensaje: `Encuesta ${id} eliminada` };
    }
};
exports.EncuestasController = EncuestasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], EncuestasController.prototype, "startEncuesta", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_encuesta_dto_1.CreateEncuestaDto]),
    __metadata("design:returntype", void 0)
], EncuestasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EncuestasController.prototype, "findByCodigo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_encuesta_dto_1.UpdateEncuestaDto]),
    __metadata("design:returntype", void 0)
], EncuestasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EncuestasController.prototype, "removeEncuesta", null);
exports.EncuestasController = EncuestasController = __decorate([
    (0, common_1.Controller)('encuesta'),
    __metadata("design:paramtypes", [encuestas_service_1.EncuestasService])
], EncuestasController);
//# sourceMappingURL=encuestas.controller.js.map