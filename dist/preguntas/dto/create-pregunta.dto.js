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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePreguntaDto = void 0;
const class_validator_1 = require("class-validator");
const pregunta_entity_1 = require("../entities/pregunta.entity");
class CreatePreguntaDto {
    numero;
    texto;
    tipo;
    encuestaId;
}
exports.CreatePreguntaDto = CreatePreguntaDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El número de la pregunta debe ser un entero.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tiene que enumerar la pregunta' }),
    __metadata("design:type", Number)
], CreatePreguntaDto.prototype, "numero", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La pregunta no puede estar vacía' }),
    __metadata("design:type", String)
], CreatePreguntaDto.prototype, "texto", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(pregunta_entity_1.TipoRespuesta, {
        message: 'El tipo de pregunta debe ser "ABIERTA", "OPCION_MULTIPLE_SELECCION_SIMPLE" o "OPCION_MULTIPLE_SELECCION_MULTIPLE".',
    }),
    __metadata("design:type", String)
], CreatePreguntaDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El ID de encuesta debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreatePreguntaDto.prototype, "encuestaId", void 0);
//# sourceMappingURL=create-pregunta.dto.js.map