import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
export declare class Respuesta {
    id: number;
    encuesta: Encuesta;
    abiertas: RespuestaAbierta[];
    opciones: RespuestaOpcion[];
}
