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
exports.PreguntasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const encuesta_entity_1 = require("../encuestas/entities/encuesta.entity");
const typeorm_2 = require("typeorm");
const pregunta_entity_1 = require("./entities/pregunta.entity");
const opciones_service_1 = require("../opciones/opciones.service");
let PreguntasService = class PreguntasService {
    preguntaRepository;
    opcionesService;
    encuestaRepository;
    constructor(preguntaRepository, opcionesService, encuestaRepository) {
        this.preguntaRepository = preguntaRepository;
        this.opcionesService = opcionesService;
        this.encuestaRepository = encuestaRepository;
    }
    async create(createPreguntaDto) {
        const encuesta = await this.encuestaRepository.findOneBy({ id: createPreguntaDto.encuestaId });
        if (!encuesta) {
            throw new common_1.NotFoundException(`Encuesta con ID ${createPreguntaDto.encuestaId} no encontrada`);
        }
        const nuevaPregunta = this.preguntaRepository.create({
            numero: createPreguntaDto.numero,
            texto: createPreguntaDto.texto,
            tipo: createPreguntaDto.tipo,
            encuesta,
        });
        return this.preguntaRepository.save(nuevaPregunta);
    }
    async obtenerPreguntasPorEncuesta(encuestaId) {
        const preguntas = await this.preguntaRepository.find({
            where: { encuesta: { id: encuestaId } },
        });
        return Promise.all(preguntas.map(async (pregunta) => {
            const esTipoConOpciones = pregunta.tipo === pregunta_entity_1.TipoRespuesta.OPCION_SIMPLE ||
                pregunta.tipo === pregunta_entity_1.TipoRespuesta.OPCION_MULTIPLE;
            if (esTipoConOpciones) {
                const opciones = await this.opcionesService.findOpcionesByPregunta(pregunta.id);
                return { ...pregunta, opciones };
            }
            return { ...pregunta };
        }));
    }
    findOne(id) {
        return `This action returns a #${id} pregunta`;
    }
    update(id, updatePreguntaDto) {
        return `This action updates a #${id} pregunta`;
    }
    remove(id) {
        return `This action removes a #${id} pregunta`;
    }
};
exports.PreguntasService = PreguntasService;
exports.PreguntasService = PreguntasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pregunta_entity_1.Pregunta)),
    __param(2, (0, typeorm_1.InjectRepository)(encuesta_entity_1.Encuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        opciones_service_1.OpcionesService,
        typeorm_2.Repository])
], PreguntasService);
//# sourceMappingURL=preguntas.service.js.map