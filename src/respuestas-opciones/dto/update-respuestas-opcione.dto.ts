import { PartialType } from '@nestjs/mapped-types';
import { CreateRespuestasOpcioneDto } from './create-respuestas-opcione.dto';

export class UpdateRespuestasOpcioneDto extends PartialType(CreateRespuestasOpcioneDto) {}
