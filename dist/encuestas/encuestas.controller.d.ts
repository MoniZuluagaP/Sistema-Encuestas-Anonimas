import { EncuestasService } from './encuestas.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';
export declare class EncuestasController {
    private readonly encuestasService;
    constructor(encuestasService: EncuestasService);
    startEncuesta(): string;
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
    findByCodigo(codigo: string): Promise<Encuesta>;
    update(id: string, updateEncuestaDto: UpdateEncuestaDto): Promise<Encuesta>;
    removeEncuesta(id: string): Promise<{
        mensaje: string;
    }>;
}
