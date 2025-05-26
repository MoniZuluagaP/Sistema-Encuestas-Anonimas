"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEncuestaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_encuesta_dto_1 = require("./create-encuesta.dto");
class UpdateEncuestaDto extends (0, mapped_types_1.PartialType)(create_encuesta_dto_1.CreateEncuestaDto) {
}
exports.UpdateEncuestaDto = UpdateEncuestaDto;
//# sourceMappingURL=update-encuesta.dto.js.map