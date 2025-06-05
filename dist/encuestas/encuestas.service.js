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
exports.EncuestasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const encuesta_entity_1 = require("./entities/encuesta.entity");
const preguntas_service_1 = require("../preguntas/preguntas.service");
const opciones_service_1 = require("../opciones/opciones.service");
const respuestas_service_1 = require("../respuestas/respuestas.service");
let EncuestasService = class EncuestasService {
    encuestaRepo;
    preguntasService;
    opcionService;
    respuestasService;
    constructor(encuestaRepo, preguntasService, opcionService, respuestasService) {
        this.encuestaRepo = encuestaRepo;
        this.preguntasService = preguntasService;
        this.opcionService = opcionService;
        this.respuestasService = respuestasService;
    }
    create(createEncuestaDto) {
        const nuevaEncuesta = this.encuestaRepo.create({
            ...createEncuestaDto,
            codigo_respuesta: (0, uuid_1.v4)(),
            codigo_resultados: (0, uuid_1.v4)(),
        });
        return this.encuestaRepo.save(nuevaEncuesta);
    }
    async findByCodigo(codigo) {
        const encuesta = await this.encuestaRepo.findOne({
            where: [
                { codigo_respuesta: codigo },
                { codigo_resultados: codigo },
            ],
        });
        if (!encuesta) {
            throw new common_1.NotFoundException("Encuesta no encontrada");
        }
        const esCodigoRespuesta = codigo === encuesta.codigo_respuesta;
        const esCodigoAdmin = codigo === encuesta.codigo_resultados;
        if (!encuesta.activa) {
            if (esCodigoRespuesta) {
                throw new common_1.BadRequestException("Encuesta deshabilitada");
            }
        }
        if (encuesta.fecha_vencimiento) {
            const ahora = new Date();
            const vencimiento = new Date(encuesta.fecha_vencimiento);
            if (vencimiento < ahora && esCodigoRespuesta) {
                throw new common_1.BadRequestException("Encuesta vencida");
            }
        }
        const preguntas = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);
        return {
            ...encuesta,
            preguntas,
        };
    }
    async actualizarEstado(codigo, activa) {
        const encuesta = await this.encuestaRepo.findOne({
            where: { codigo_resultados: codigo },
        });
        if (!encuesta) {
            throw new common_1.NotFoundException("Encuesta no encontrada");
        }
        encuesta.activa = activa;
        return this.encuestaRepo.save(encuesta);
    }
    async actualizarFechaVencimiento(codigo, fecha) {
        const encuesta = await this.encuestaRepo.findOne({
            where: { codigo_resultados: codigo },
        });
        if (!encuesta) {
            throw new common_1.NotFoundException("Encuesta no encontrada");
        }
        encuesta.fecha_vencimiento = fecha;
        return this.encuestaRepo.save(encuesta);
    }
    async update(id, updateEncuestaDto) {
        const encuesta = await this.encuestaRepo.findOne({ where: { id } });
        if (!encuesta) {
            throw new common_1.NotFoundException(`Encuesta con id ${id} no encontrada`);
        }
        Object.assign(encuesta, updateEncuestaDto);
        return this.encuestaRepo.save(encuesta);
    }
    async remove(id) {
        const encuesta = await this.encuestaRepo.findOne({ where: { id } });
        if (!encuesta) {
            throw new common_1.NotFoundException(`Encuesta con id ${id} no encontrada`);
        }
        const respuestasArray = await this.respuestasService.obtenerPorEncuesta(id);
        if (respuestasArray.length > 0) {
            throw new common_1.BadRequestException(`No se puede eliminar la encuesta ${id} porque ya tiene respuestas`);
        }
        const result = await this.encuestaRepo.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.EncuestasService = EncuestasService;
exports.EncuestasService = EncuestasService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(encuesta_entity_1.Encuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        preguntas_service_1.PreguntasService,
        opciones_service_1.OpcionesService,
        respuestas_service_1.RespuestasService])
], EncuestasService);
//# sourceMappingURL=encuestas.service.js.map