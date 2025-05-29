import { RespuestasOpcionesService } from './respuestas-opciones.service';
import { CreateRespuestaOpcionDto } from './dto/create-respuestas-opciones.dto';
export declare class RespuestasOpcionesController {
    private readonly respuestasOpcionesService;
    constructor(respuestasOpcionesService: RespuestasOpcionesService);
    create(dto: CreateRespuestaOpcionDto): Promise<import("./entities/respuesta-opciones.entity").RespuestaOpcion>;
}
