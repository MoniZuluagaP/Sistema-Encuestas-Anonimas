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
const email_service_1 = require("../email/email.service");
let EncuestasController = class EncuestasController {
    encuestasService;
    emailService;
    constructor(encuestasService, emailService) {
        this.encuestasService = encuestasService;
        this.emailService = emailService;
    }
    startEncuesta() {
        return 'ACA DEBE IRSE ARMANDO LA ENCUESTA, ESTAN LOS CAMPOS PARA COMPLETAR Y CREAR LA ENCUESTA Y EL BOTON PARA HACER';
    }
    async create(createEncuestaDto) {
        const encuestaCreada = await this.encuestasService.create(createEncuestaDto);
        const email = createEncuestaDto.email;
        const nombre = createEncuestaDto.nombre;
        const codigo_respuesta = encuestaCreada.codigo_respuesta;
        const codigo_resultados = encuestaCreada.codigo_resultados;
        await this.emailService.enviarEnlaceEncuesta(email, nombre, codigo_respuesta, codigo_resultados);
        return encuestaCreada;
    }
    findByCodigo(codigo) {
        return this.encuestasService.findByCodigo(codigo);
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
    __metadata("design:returntype", Promise)
], EncuestasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EncuestasController.prototype, "findByCodigo", null);
exports.EncuestasController = EncuestasController = __decorate([
    (0, common_1.Controller)('encuesta'),
    __metadata("design:paramtypes", [encuestas_service_1.EncuestasService,
        email_service_1.EmailService])
], EncuestasController);
//# sourceMappingURL=encuestas.controller.js.map