import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Repository } from 'typeorm';
import { Respuesta } from './entities/respuesta.entity';
export declare class RespuestasService {
    private readonly respuestaRepository;
    private readonly encuestaRepository;
    constructor(respuestaRepository: Repository<Respuesta>, encuestaRepository: Repository<Encuesta>);
    create(createRespuestaDto: CreateRespuestaDto): Promise<Respuesta>;
    findByEncuestaId(encuestaId: number): Promise<Respuesta | null>;
}
