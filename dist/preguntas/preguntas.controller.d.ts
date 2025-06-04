import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';
export declare class PreguntasController {
    private readonly preguntasService;
    constructor(preguntasService: PreguntasService);
    create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta>;
    obtenerPreguntasPorEncuesta(encuestaId: number): Promise<Pregunta[]>;
    update(id: string, updatePreguntaDto: UpdatePreguntaDto): Promise<any>;
    remove(id: number, body: any): Promise<{
        message: string;
    }>;
}
