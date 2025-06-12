import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaOpcionMultiple } from 'src/respuestas-opcion-multiple/entities/respuesta-opcion-multiple.entity';

export interface RespuestaOpcionMultipleConOpciones
  extends RespuestaOpcionMultiple {
  opciones: Opcion[];
}
