import { CreateRespuestasAbiertaDto } from './dto/create-respuestas-abierta.dto';
import { UpdateRespuestasAbiertaDto } from './dto/update-respuestas-abierta.dto';
export declare class RespuestasAbiertasService {
    create(createRespuestasAbiertaDto: CreateRespuestasAbiertaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRespuestasAbiertaDto: UpdateRespuestasAbiertaDto): string;
    remove(id: number): string;
}
