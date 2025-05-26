import { PartialType } from '@nestjs/mapped-types';
import { CreateRespuestasAbiertaDto } from './create-respuestas-abierta.dto';

export class UpdateRespuestasAbiertaDto extends PartialType(CreateRespuestasAbiertaDto) {}
