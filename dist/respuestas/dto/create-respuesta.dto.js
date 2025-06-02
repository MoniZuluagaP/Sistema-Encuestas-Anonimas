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
exports.CreateRespuestaDto = exports.RespuestaOpcionDto = exports.RespuestaAbiertaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RespuestaAbiertaDto {
    preguntaId;
    texto;
}
exports.RespuestaAbiertaDto = RespuestaAbiertaDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RespuestaAbiertaDto.prototype, "preguntaId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RespuestaAbiertaDto.prototype, "texto", void 0);
class RespuestaOpcionDto {
    preguntaId;
    opcionId;
}
exports.RespuestaOpcionDto = RespuestaOpcionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RespuestaOpcionDto.prototype, "preguntaId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RespuestaOpcionDto.prototype, "opcionId", void 0);
class CreateRespuestaDto {
    codigoEncuesta;
    abiertas;
    opciones;
}
exports.CreateRespuestaDto = CreateRespuestaDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRespuestaDto.prototype, "codigoEncuesta", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RespuestaAbiertaDto),
    __metadata("design:type", Array)
], CreateRespuestaDto.prototype, "abiertas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RespuestaOpcionDto),
    __metadata("design:type", Array)
], CreateRespuestaDto.prototype, "opciones", void 0);
//# sourceMappingURL=create-respuesta.dto.js.map