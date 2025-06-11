import { IsArray, IsInt, IsNotEmpty } from "class-validator";


export class CreateRespuestaOpcionMultipleDto {
    @IsNotEmpty()
    @IsInt()
    respuestaId: number; 

    @IsNotEmpty()
    @IsInt()
    preguntaId: number; 
    
    @IsNotEmpty()
    @IsArray()
    opcionIds: number[];     
}