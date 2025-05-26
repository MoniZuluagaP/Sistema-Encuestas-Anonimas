import { IsString, IsOptional, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEncuestaDto {
    
  @IsString()
  @IsNotEmpty({message: 'La encuesta debe tener un nombre'})
  nombre: string;

  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string; // importante en el front controlar el formato de la fecha para poder enviarla al controller

  @IsOptional()
  @IsEmail()
  email?: string; 

}