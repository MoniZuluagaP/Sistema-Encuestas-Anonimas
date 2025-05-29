import { Repository } from 'typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaOpcion } from './entities/respuesta-opciones.entity';
import { CreateRespuestaOpcionDto } from './dto/create-respuestas-opciones.dto';
export declare class RespuestasOpcionesService {
    private readonly respuestaOpcionRepository;
    private readonly opcionRepository;
    private readonly respuestaRepository;
    constructor(respuestaOpcionRepository: Repository<RespuestaOpcion>, opcionRepository: Repository<Opcion>, respuestaRepository: Repository<Respuesta>);
    create(createRespuestaOpcionDto: CreateRespuestaOpcionDto): Promise<RespuestaOpcion>;
    findByRespuestaId(respuestaId: number): Promise<RespuestaOpcion[]>;
}
