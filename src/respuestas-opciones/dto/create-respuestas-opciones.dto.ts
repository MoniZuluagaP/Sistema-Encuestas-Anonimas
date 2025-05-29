import { IsIn, IsInt, IsNotEmpty } from "class-validator";


export class CreateRespuestaOpcionDto {
  
    @IsNotEmpty()
    @IsInt()
    respuestaId: number; 
    
    @IsNotEmpty()
    @IsInt()
    opcionId: number;     
}