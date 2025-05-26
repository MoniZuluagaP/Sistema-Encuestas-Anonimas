import { Pregunta } from "src/preguntas/entities/pregunta.entity";
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
export declare class Opcion {
    id: number;
    texto: string;
    numero: number;
    pregunta: Pregunta;
    respuestasOpcion: RespuestaOpcion[];
}
