import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';
export declare class PreguntasController {
    private readonly preguntasService;
    constructor(preguntasService: PreguntasService);
    create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta>;
    obtenerPreguntasPorEncuesta(encuestaId: number): Promise<Pregunta[]>;
}
