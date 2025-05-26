import { CreateRespuestasOpcioneDto } from './dto/create-respuestas-opcione.dto';
import { UpdateRespuestasOpcioneDto } from './dto/update-respuestas-opcione.dto';
export declare class RespuestasOpcionesService {
    create(createRespuestasOpcioneDto: CreateRespuestasOpcioneDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRespuestasOpcioneDto: UpdateRespuestasOpcioneDto): string;
    remove(id: number): string;
}
