"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRespuestaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_respuesta_dto_1 = require("./create-respuesta.dto");
class UpdateRespuestaDto extends (0, mapped_types_1.PartialType)(create_respuesta_dto_1.CreateRespuestaDto) {
}
exports.UpdateRespuestaDto = UpdateRespuestaDto;
//# sourceMappingURL=update-respuesta.dto.js.map