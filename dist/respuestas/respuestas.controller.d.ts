import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
export declare class RespuestasController {
    private readonly respuestasService;
    constructor(respuestasService: RespuestasService);
    create(createRespuestaDto: CreateRespuestaDto): Promise<import("./entities/respuesta.entity").Respuesta>;
    findByEncuestaId(encuestaId: string): Promise<import("./entities/respuesta.entity").Respuesta | null>;
}
