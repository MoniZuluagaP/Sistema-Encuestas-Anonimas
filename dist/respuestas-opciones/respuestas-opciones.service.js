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
exports.RespuestasOpcionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const respuesta_entity_1 = require("../respuestas/entities/respuesta.entity");
const opciones_entity_1 = require("../opciones/entities/opciones.entity");
const respuesta_opciones_entity_1 = require("./entities/respuesta-opciones.entity");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
let RespuestasOpcionesService = class RespuestasOpcionesService {
    respuestaOpcionRepository;
    opcionRepository;
    respuestaRepository;
    constructor(respuestaOpcionRepository, opcionRepository, respuestaRepository) {
        this.respuestaOpcionRepository = respuestaOpcionRepository;
        this.opcionRepository = opcionRepository;
        this.respuestaRepository = respuestaRepository;
    }
    async create(createRespuestaOpcionDto) {
        const opcion = await this.opcionRepository.findOne({
            where: { id: createRespuestaOpcionDto.opcionId },
            relations: ['pregunta'],
        });
        if (!opcion) {
            throw new common_1.NotFoundException('Opción no encontrada');
        }
        const pregunta = opcion.pregunta;
        const respuesta = await this.respuestaRepository.findOne({ where: { id: createRespuestaOpcionDto.respuestaId } });
        if (!respuesta) {
            throw new common_1.NotFoundException('Respuesta (conjunto) no encontrada');
        }
        const yaExiste = await this.respuestaOpcionRepository.findOne({
            where: {
                respuesta: { id: createRespuestaOpcionDto.respuestaId },
                opcion: { id: createRespuestaOpcionDto.opcionId },
            },
            relations: ['opcion', 'respuesta'],
        });
        if (yaExiste) {
            throw new common_1.ConflictException('Esta opción de respuesta ya fue seleccionada.');
        }
        if (pregunta.tipo === pregunta_entity_1.TipoRespuesta.OPCION_SIMPLE) {
            const yaRespondida = await this.respuestaOpcionRepository.findOne({
                where: {
                    respuesta: { id: createRespuestaOpcionDto.respuestaId },
                    opcion: { pregunta: { id: pregunta.id } },
                },
                relations: ['opcion', 'opcion.pregunta'],
            });
            if (yaRespondida) {
                throw new common_1.ConflictException('Solo puede haber una respuesta para respuestas de opción simple.');
            }
        }
        const nueva = this.respuestaOpcionRepository.create({
            opcion,
            respuesta,
        });
        return this.respuestaOpcionRepository.save(nueva);
    }
    async findByRespuestaId(respuestaId) {
        return this.respuestaOpcionRepository.find({
            where: { respuesta: { id: respuestaId } },
            relations: ['opcion', 'opcion.pregunta'],
        });
    }
};
exports.RespuestasOpcionesService = RespuestasOpcionesService;
exports.RespuestasOpcionesService = RespuestasOpcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_opciones_entity_1.RespuestaOpcion)),
    __param(1, (0, typeorm_1.InjectRepository)(opciones_entity_1.Opcion)),
    __param(2, (0, typeorm_1.InjectRepository)(respuesta_entity_1.Respuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RespuestasOpcionesService);
//# sourceMappingURL=respuestas-opciones.service.js.map