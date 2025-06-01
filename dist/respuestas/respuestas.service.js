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
exports.RespuestasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const encuesta_entity_1 = require("../encuestas/entities/encuesta.entity");
const respuesta_entity_1 = require("./entities/respuesta.entity");
const respuestas_abiertas_service_1 = require("../respuestas-abiertas/respuestas-abiertas.service");
const respuestas_opciones_service_1 = require("../respuestas-opciones/respuestas-opciones.service");
let RespuestasService = class RespuestasService {
    respuestaRepository;
    encuestaRepository;
    respuestasAbiertasService;
    respuestasOpcionesService;
    constructor(respuestaRepository, encuestaRepository, respuestasAbiertasService, respuestasOpcionesService) {
        this.respuestaRepository = respuestaRepository;
        this.encuestaRepository = encuestaRepository;
        this.respuestasAbiertasService = respuestasAbiertasService;
        this.respuestasOpcionesService = respuestasOpcionesService;
    }
    async create(createRespuestaDto) {
        const encuesta = await this.encuestaRepository.findOne({
            where: { codigo_resultados: createRespuestaDto.codigoEncuesta },
        });
        if (!encuesta) {
            throw new common_1.NotFoundException('Encuesta no encontrada');
        }
        const nuevaRespuesta = this.respuestaRepository.create({ encuesta });
        const respuestaGuardada = await this.respuestaRepository.save(nuevaRespuesta);
        if (Array.isArray(createRespuestaDto.abiertas)) {
            for (const abiertaDto of createRespuestaDto.abiertas) {
                await this.respuestasAbiertasService.create({
                    preguntaId: abiertaDto.preguntaId,
                    texto: abiertaDto.texto,
                    respuestaId: respuestaGuardada.id,
                });
            }
        }
        if (Array.isArray(createRespuestaDto.opciones)) {
            for (const opcionDto of createRespuestaDto.opciones) {
                await this.respuestasOpcionesService.create({
                    preguntaId: opcionDto.preguntaId,
                    opcionId: opcionDto.opcionId,
                    respuestaId: respuestaGuardada.id,
                });
            }
        }
        return respuestaGuardada;
    }
    async obtenerPorEncuesta(encuestaId) {
        return this.respuestaRepository.find({
            where: { encuesta: { id: encuestaId } },
            relations: ['encuesta'],
        });
    }
    async findByEncuestaId(encuestaId) {
        return this.respuestaRepository.findOne({
            where: { encuesta: { id: encuestaId } },
            relations: ['encuesta'],
        });
    }
};
exports.RespuestasService = RespuestasService;
exports.RespuestasService = RespuestasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_entity_1.Respuesta)),
    __param(1, (0, typeorm_1.InjectRepository)(encuesta_entity_1.Encuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        respuestas_abiertas_service_1.RespuestasAbiertasService,
        respuestas_opciones_service_1.RespuestasOpcionesService])
], RespuestasService);
//# sourceMappingURL=respuestas.service.js.map