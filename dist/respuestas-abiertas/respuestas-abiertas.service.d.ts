import { Repository } from 'typeorm';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { CreateRespuestaAbiertaDto } from './dto/create-respuestas-abiertas.dto';
export declare class RespuestasAbiertasService {
    private readonly respuestaAbiertaRepository;
    private readonly preguntaRepository;
    private readonly respuestaRepository;
    constructor(respuestaAbiertaRepository: Repository<RespuestaAbierta>, preguntaRepository: Repository<Pregunta>, respuestaRepository: Repository<Respuesta>);
    create(createRespuestaAbiertaDto: CreateRespuestaAbiertaDto): Promise<RespuestaAbierta>;
    findRespuestasAbiertasByRespuestaId(respuestaId: number): Promise<RespuestaAbierta[]>;
}
