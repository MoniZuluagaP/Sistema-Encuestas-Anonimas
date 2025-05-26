import { RespuestasOpcionesService } from './respuestas-opciones.service';
import { CreateRespuestasOpcioneDto } from './dto/create-respuestas-opcione.dto';
import { UpdateRespuestasOpcioneDto } from './dto/update-respuestas-opcione.dto';
export declare class RespuestasOpcionesController {
    private readonly respuestasOpcionesService;
    constructor(respuestasOpcionesService: RespuestasOpcionesService);
    create(createRespuestasOpcioneDto: CreateRespuestasOpcioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRespuestasOpcioneDto: UpdateRespuestasOpcioneDto): string;
    remove(id: string): string;
}
