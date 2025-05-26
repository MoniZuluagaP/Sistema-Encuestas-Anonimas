import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
export declare class RespuestasController {
    private readonly respuestasService;
    constructor(respuestasService: RespuestasService);
    create(createRespuestaDto: CreateRespuestaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRespuestaDto: UpdateRespuestaDto): string;
    remove(id: string): string;
}
