import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
export declare class RespuestaAbierta {
    id: number;
    texto: string;
    pregunta: Pregunta;
    respuesta: Respuesta;
}
