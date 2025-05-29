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
exports.RespuestasAbiertasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const respuesta_abierta_entity_1 = require("./entities/respuesta-abierta.entity");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
const respuesta_entity_1 = require("../respuestas/entities/respuesta.entity");
const pregunta_entity_2 = require("../preguntas/entities/pregunta.entity");
let RespuestasAbiertasService = class RespuestasAbiertasService {
    respuestaAbiertaRepository;
    preguntaRepository;
    respuestaRepository;
    constructor(respuestaAbiertaRepository, preguntaRepository, respuestaRepository) {
        this.respuestaAbiertaRepository = respuestaAbiertaRepository;
        this.preguntaRepository = preguntaRepository;
        this.respuestaRepository = respuestaRepository;
    }
    async create(createRespuestaAbiertaDto) {
        const pregunta = await this.preguntaRepository.findOne({
            where: { id: createRespuestaAbiertaDto.preguntaId },
        });
        if (!pregunta) {
            throw new common_1.NotFoundException('Pregunta no encontrada');
        }
        if (pregunta.tipo !== pregunta_entity_2.TipoRespuesta.ABIERTA) {
            throw new common_1.BadRequestException('La pregunta no es de tipo abierta');
        }
        const respuesta = await this.respuestaRepository.findOne({
            where: { id: createRespuestaAbiertaDto.respuestaId },
        });
        if (!respuesta) {
            throw new common_1.NotFoundException('No se encuentra el registro de respuestas de la encuesta');
        }
        const yaExiste = await this.respuestaAbiertaRepository.findOne({
            where: {
                pregunta: { id: createRespuestaAbiertaDto.preguntaId },
                respuesta: { id: createRespuestaAbiertaDto.respuestaId },
            },
        });
        if (yaExiste) {
            throw new common_1.ConflictException('Ya existe una respuesta para esta pregunta ');
        }
        const nueva = this.respuestaAbiertaRepository.create({
            texto: createRespuestaAbiertaDto.texto,
            pregunta,
            respuesta,
        });
        return this.respuestaAbiertaRepository.save(nueva);
    }
    async findRespuestasAbiertasByRespuestaId(respuestaId) {
        return this.respuestaAbiertaRepository.find({
            where: { respuesta: { id: respuestaId } },
            relations: ['pregunta'],
        });
    }
};
exports.RespuestasAbiertasService = RespuestasAbiertasService;
exports.RespuestasAbiertasService = RespuestasAbiertasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_abierta_entity_1.RespuestaAbierta)),
    __param(1, (0, typeorm_1.InjectRepository)(pregunta_entity_1.Pregunta)),
    __param(2, (0, typeorm_1.InjectRepository)(respuesta_entity_1.Respuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RespuestasAbiertasService);
//# sourceMappingURL=respuestas-abiertas.service.js.map