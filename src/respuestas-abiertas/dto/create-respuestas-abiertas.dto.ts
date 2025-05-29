import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRespuestaAbiertaDto {
  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsNumber()
  @IsNotEmpty()
  respuestaId: number; 

  @IsNumber()
  @IsNotEmpty()
  preguntaId: number; 
}