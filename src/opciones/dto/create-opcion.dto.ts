import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOpcionDto {
  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsInt()
  numero: number;

  @IsNotEmpty({message: 'Tiene que decir a que respuesta pertenece la opcion'})
  @IsInt()
  preguntaId: number;
}