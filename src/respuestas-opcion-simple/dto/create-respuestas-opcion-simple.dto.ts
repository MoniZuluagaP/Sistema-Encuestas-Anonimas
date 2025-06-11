import { IsInt, IsNotEmpty } from "class-validator";


export class CreateRespuestaOpcionSimpleDto {
    @IsNotEmpty()
    @IsInt()
    respuestaId: number; 

    @IsNotEmpty()
    @IsInt()
    preguntaId: number; 
    
    @IsNotEmpty()
    @IsInt()
    opcionId: number;     
}