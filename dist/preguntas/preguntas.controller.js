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
exports.PreguntasController = void 0;
const common_1 = require("@nestjs/common");
const preguntas_service_1 = require("./preguntas.service");
const create_pregunta_dto_1 = require("./dto/create-pregunta.dto");
const update_pregunta_dto_1 = require("./dto/update-pregunta.dto");
let PreguntasController = class PreguntasController {
    preguntasService;
    constructor(preguntasService) {
        this.preguntasService = preguntasService;
    }
    create(createPreguntaDto) {
        return this.preguntasService.create(createPreguntaDto);
    }
    obtenerPreguntasPorEncuesta(encuestaId) {
        return this.preguntasService.obtenerPreguntasPorEncuesta(encuestaId);
    }
    update(id, updatePreguntaDto) {
        return this.preguntasService.update(+id, updatePreguntaDto);
    }
    async remove(id, body) {
        console.log('Eliminando pregunta sin respuestas...');
        console.log('Body recibido:', body);
        await this.preguntasService.remove(id);
        return { message: 'Pregunta eliminada exitosamente.' };
    }
    ;
};
exports.PreguntasController = PreguntasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pregunta_dto_1.CreatePreguntaDto]),
    __metadata("design:returntype", void 0)
], PreguntasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('encuesta/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PreguntasController.prototype, "obtenerPreguntasPorEncuesta", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pregunta_dto_1.UpdatePreguntaDto]),
    __metadata("design:returntype", void 0)
], PreguntasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PreguntasController.prototype, "remove", null);
exports.PreguntasController = PreguntasController = __decorate([
    (0, common_1.Controller)('preguntas'),
    __metadata("design:paramtypes", [preguntas_service_1.PreguntasService])
], PreguntasController);
//# sourceMappingURL=preguntas.controller.js.map