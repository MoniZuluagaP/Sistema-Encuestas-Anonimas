import { TipoRespuesta } from '../entities/pregunta.entity';
export declare class CreatePreguntaDto {
    numero: number;
    texto: string;
    tipo: TipoRespuesta;
    encuestaId: number;
}
