import { Pregunta } from "src/preguntas/entities/pregunta.entity";
import { Respuesta } from "src/respuestas/entities/respuesta.entity";
export declare class Encuesta {
    id: number;
    nombre: string;
    codigo_respuesta: string;
    codigo_resultados: string;
    fecha_vencimiento: Date | null;
    email: string;
    preguntas: Pregunta[];
    respuestas: Respuesta[];
}
