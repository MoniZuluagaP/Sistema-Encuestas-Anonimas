"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePreguntaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pregunta_dto_1 = require("./create-pregunta.dto");
class UpdatePreguntaDto extends (0, mapped_types_1.PartialType)(create_pregunta_dto_1.CreatePreguntaDto) {
}
exports.UpdatePreguntaDto = UpdatePreguntaDto;
//# sourceMappingURL=update-pregunta.dto.js.map