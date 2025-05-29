import { IsUUID } from "class-validator";

export class CreateRespuestaDto {
  @IsUUID()
  codigoEncuesta: string;
}