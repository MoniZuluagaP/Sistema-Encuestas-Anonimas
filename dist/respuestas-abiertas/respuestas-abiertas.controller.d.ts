import { RespuestasAbiertasService } from './respuestas-abiertas.service';
import { CreateRespuestasAbiertaDto } from './dto/create-respuestas-abierta.dto';
import { UpdateRespuestasAbiertaDto } from './dto/update-respuestas-abierta.dto';
export declare class RespuestasAbiertasController {
    private readonly respuestasAbiertasService;
    constructor(respuestasAbiertasService: RespuestasAbiertasService);
    create(createRespuestasAbiertaDto: CreateRespuestasAbiertaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRespuestasAbiertaDto: UpdateRespuestasAbiertaDto): string;
    remove(id: string): string;
}
