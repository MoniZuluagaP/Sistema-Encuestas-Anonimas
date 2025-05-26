import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
export declare class RespuestasService {
    create(createRespuestaDto: CreateRespuestaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRespuestaDto: UpdateRespuestaDto): string;
    remove(id: number): string;
}
