import { RespuestasAbiertasService } from './respuestas-abiertas.service';
import { CreateRespuestaAbiertaDto } from './dto/create-respuestas-abiertas.dto';
export declare class RespuestasAbiertasController {
    private readonly respuestasAbiertasService;
    constructor(respuestasAbiertasService: RespuestasAbiertasService);
    create(createDto: CreateRespuestaAbiertaDto): Promise<import("./entities/respuesta-abierta.entity").RespuestaAbierta>;
    findRespuestasAbiertasByRespuestaId(encuestaId: string): Promise<import("./entities/respuesta-abierta.entity").RespuestaAbierta[]>;
}
