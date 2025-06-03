import { IsString, IsOptional, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEncuestaDto {
    
  @IsString()
  @IsNotEmpty({message: 'La encuesta debe tener un nombre'})
  nombre: string;

  @IsNotEmpty({message: 'Es necesario definir la fecha de vencimiento'})
  @IsDateString()
  fecha_vencimiento: string; // importante en el front controlar el formato de la fecha para poder enviarla al controller

  @IsOptional()
  @IsEmail()
  email?: string; 

}
