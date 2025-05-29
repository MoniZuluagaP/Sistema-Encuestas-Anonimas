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
exports.OpcionesService = void 0;
const common_1 = require("@nestjs/common");
const pregunta_entity_1 = require("../preguntas/entities/pregunta.entity");
const opciones_entity_1 = require("./entities/opciones.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OpcionesService = class OpcionesService {
    opcionRepository;
    preguntaRepository;
    constructor(opcionRepository, preguntaRepository) {
        this.opcionRepository = opcionRepository;
        this.preguntaRepository = preguntaRepository;
    }
    async findOpcionesByPregunta(preguntaId) {
        const pregunta = await this.preguntaRepository.findOne({ where: { id: preguntaId } });
        if (!pregunta) {
            throw new common_1.NotFoundException('Pregunta no encontrada');
        }
        const esTipoConOpciones = pregunta.tipo === pregunta_entity_1.TipoRespuesta.OPCION_SIMPLE ||
            pregunta.tipo === pregunta_entity_1.TipoRespuesta.OPCION_MULTIPLE;
        if (!esTipoConOpciones) {
            return [];
        }
        return this.opcionRepository.find({
            where: { pregunta: { id: preguntaId } }
        });
    }
    async createOpcion(createOpcionDto) {
        const pregunta = await this.preguntaRepository.findOne({
            where: { id: createOpcionDto.preguntaId },
        });
        if (!pregunta) {
            throw new common_1.NotFoundException('Pregunta no encontrada');
        }
        const tiposPermitidos = [
            pregunta_entity_1.TipoRespuesta.OPCION_SIMPLE,
            pregunta_entity_1.TipoRespuesta.OPCION_MULTIPLE,
        ];
        if (!tiposPermitidos.includes(pregunta.tipo)) {
            throw new common_1.BadRequestException(`No se pueden agregar opciones a una pregunta de tipo ${pregunta.tipo}`);
        }
        const newOpcionRespuesta = this.opcionRepository.create({
            texto: createOpcionDto.texto,
            numero: createOpcionDto.numero,
            pregunta: pregunta,
        });
        return this.opcionRepository.save(newOpcionRespuesta);
    }
};
exports.OpcionesService = OpcionesService;
exports.OpcionesService = OpcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(opciones_entity_1.Opcion)),
    __param(1, (0, typeorm_1.InjectRepository)(pregunta_entity_1.Pregunta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OpcionesService);
//# sourceMappingURL=opciones.service.js.map