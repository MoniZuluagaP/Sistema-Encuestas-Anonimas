
import {
  IsUUID,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para una sola respuesta de texto abierto.
 */
export class RespuestaAbiertaDto {
  @IsNumber()
  preguntaId: number;

  @IsString()
  texto: string;
}

/**
 * DTO para una sola respuesta de opción (simple o múltiple).
 */
export class RespuestaOpcionDto {
  @IsNumber()
  preguntaId: number;

  @IsNumber()
  opcionId: number;
}

/**
 * DTO principal para crear todas las respuestas de una encuesta.
 */
export class CreateRespuestasDto {
  @IsUUID()
  codigoEncuesta: string;
}

