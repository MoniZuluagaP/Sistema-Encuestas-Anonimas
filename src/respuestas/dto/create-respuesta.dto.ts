//import { IsUUID } from "class-validator";


// src/respuestas/dto/create-respuesta.dto.ts

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

// export class CreateRespuestaDto {
//   @IsUUID()
//   codigoEncuesta: string;

//   /**
//    * Respuestas a preguntas abiertas, si las hay.
//    * Ejemplo:
//    * [
//    *   { "preguntaId": 5, "texto": "Mi respuesta" },
//    *   { "preguntaId": 6, "texto": "Otra respuesta" }
//    * ]
//    */
//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => RespuestaAbiertaDto)
//   abiertas?: RespuestaAbiertaDto[];

//   /**
//    * Respuestas a preguntas de opción simple/múltiple, si las hay.
//    * Ejemplo:
//    * [
//    *   { "preguntaId": 8, "opcionId": 3 },
//    *   { "preguntaId": 9, "opcionId": 7 }
//    * ]
//    */
//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => RespuestaOpcionDto)
//   opciones?: RespuestaOpcionDto[];
// }
