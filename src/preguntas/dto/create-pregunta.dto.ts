import { IsEnum, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TipoRespuesta } from '../entities/pregunta.entity';


export class CreatePreguntaDto {
  @IsInt({ message: 'El número de la pregunta debe ser un entero.' })
  @IsNotEmpty({message: 'Tiene que enumerar la pregunta'})
  numero: number;

  @IsString()
  @IsNotEmpty({ message: 'La pregunta no puede estar vacía' })
  texto: string;

  @IsEnum(TipoRespuesta, {
    message: 'El tipo de pregunta debe ser "ABIERTA", "OPCION_MULTIPLE_SELECCION_SIMPLE" o "OPCION_MULTIPLE_SELECCION_MULTIPLE".',
    })
  
  tipo: TipoRespuesta;

  @IsInt({ message: 'El ID de encuesta debe ser un número entero.' })   //Este id debe tomarlo de la encuesta que se creo
  encuestaId: number;
}
