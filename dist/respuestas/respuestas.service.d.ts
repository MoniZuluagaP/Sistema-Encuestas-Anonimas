import { Repository } from 'typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Respuesta } from './entities/respuesta.entity';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';
export declare class RespuestasService {
    private readonly respuestaRepository;
    private readonly encuestaRepository;
    private readonly respuestasAbiertasService;
    private readonly respuestasOpcionesService;
    constructor(respuestaRepository: Repository<Respuesta>, encuestaRepository: Repository<Encuesta>, respuestasAbiertasService: RespuestasAbiertasService, respuestasOpcionesService: RespuestasOpcionesService);
    create(createRespuestaDto: CreateRespuestaDto): Promise<Respuesta>;
    obtenerPorEncuesta(encuestaId: number): Promise<Respuesta[]>;
    findByEncuestaId(encuestaId: number): Promise<Respuesta | null>;
}
