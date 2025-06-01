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
const respuestas_abiertas_service_1 = require("../respuestas-abiertas/respuestas-abiertas.service");
const respuestas_opciones_service_1 = require("../respuestas-opciones/respuestas-opciones.service");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
let EncuestasService = class EncuestasService {
    encuestaRepository;
    preguntasService;
    opcionService;
    respuestasService;
    respuestasAbiertasService;
    respuestasOpcionesService;
    constructor(encuestaRepository, preguntasService, opcionService, respuestasService, respuestasAbiertasService, respuestasOpcionesService) {
        this.encuestaRepository = encuestaRepository;
        this.preguntasService = preguntasService;
        this.opcionService = opcionService;
        this.respuestasService = respuestasService;
        this.respuestasAbiertasService = respuestasAbiertasService;
        this.respuestasOpcionesService = respuestasOpcionesService;
    }
    create(createEncuestaDto) {
        const nuevaEncuesta = this.encuestaRepository.create({
            ...createEncuestaDto,
            codigo_respuesta: (0, uuid_1.v4)(),
            codigo_resultados: (0, uuid_1.v4)(),
        });
        return this.encuestaRepository.save(nuevaEncuesta);
    }
    async findByCodigo(codigo) {
        const encuesta = await this.encuestaRepository.findOne({
            where: [
                { codigo_respuesta: codigo },
                { codigo_resultados: codigo },
            ],
        });
        if (!encuesta) {
            throw new common_1.NotFoundException('Encuesta no encontrada');
        }
        const mostrarRespuestas = encuesta.codigo_resultados === codigo;
        const preguntas = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);
        const respuesta = mostrarRespuestas
            ? await this.respuestasService.findByEncuestaId(encuesta.id)
            : null;
        const respuestasAbiertas = respuesta
            ? await this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaId(respuesta.id)
            : [];
        const respuestasOpciones = respuesta
            ? await this.respuestasOpcionesService.findByRespuestaId(respuesta.id)
            : [];
        const preguntasConOpcionesYRespuestas = await Promise.all(preguntas.map(async (pregunta) => {
            let opciones = [];
            if (pregunta.tipo !== pregunta_entity_1.TipoRespuesta.ABIERTA) {
                opciones = await this.opcionService.findOpcionesByPregunta(pregunta.id);
            }
            const respuestas = mostrarRespuestas
                ? pregunta.tipo === pregunta_entity_1.TipoRespuesta.ABIERTA
                    ? respuestasAbiertas.filter((respuestaAbierta) => respuestaAbierta.pregunta.id === pregunta.id)
                    : respuestasOpciones
                        .filter((respuestaOpcion) => respuestaOpcion.opcion.pregunta.id === pregunta.id)
                        .map((respuestaOpcion) => respuestaOpcion.opcion)
                : [];
            return {
                ...pregunta,
                opciones,
                respuestas,
            };
        }));
        return {
            ...encuesta,
            preguntas: preguntasConOpcionesYRespuestas,
        };
    }
    async update(id, updateEncuestaDto) {
        const encuesta = await this.encuestaRepository.findOne({ where: { id } });
        if (!encuesta) {
            throw new common_1.NotFoundException(`Encuesta con id ${id} no encontrada`);
        }
        Object.assign(encuesta, updateEncuestaDto);
        return this.encuestaRepository.save(encuesta);
    }
    async remove(id) {
        const encuesta = await this.encuestaRepository.findOne({ where: { id } });
        if (!encuesta) {
            throw new common_1.NotFoundException(`Encuesta con id ${id} no encontrada`);
        }
        const respuestasArray = await this.respuestasService.obtenerPorEncuesta(id);
        if (respuestasArray.length > 0) {
            throw new common_1.BadRequestException(`No se puede eliminar la encuesta ${id} porque ya tiene respuestas`);
        }
        const result = await this.encuestaRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.EncuestasService = EncuestasService;
exports.EncuestasService = EncuestasService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(encuesta_entity_1.Encuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        preguntas_service_1.PreguntasService,
        opciones_service_1.OpcionesService,
        respuestas_service_1.RespuestasService,
        respuestas_abiertas_service_1.RespuestasAbiertasService,
        respuestas_opciones_service_1.RespuestasOpcionesService])
], EncuestasService);
//# sourceMappingURL=encuestas.service.js.map