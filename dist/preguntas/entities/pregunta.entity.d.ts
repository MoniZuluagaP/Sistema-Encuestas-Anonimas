import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
export declare enum TipoRespuesta {
    ABIERTA = "ABIERTA",
    OPCION_SIMPLE = "OPCION_MULTIPLE_SELECCION_SIMPLE",
    OPCION_MULTIPLE = "OPCION_MULTIPLE_SELECCION_MULTIPLE"
}
export declare class Pregunta {
    id: number;
    numero: number;
    texto: string;
    tipo: TipoRespuesta;
    encuesta: Encuesta;
    opciones: Opcion[];
    respuestasAbiertas: RespuestaAbierta[];
}
