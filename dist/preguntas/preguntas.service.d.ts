import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Repository } from 'typeorm';
import { Pregunta } from './entities/pregunta.entity';
import { OpcionesService } from 'src/opciones/opciones.service';
export declare class PreguntasService {
    private readonly preguntaRepository;
    private readonly opcionesService;
    private readonly encuestaRepository;
    constructor(preguntaRepository: Repository<Pregunta>, opcionesService: OpcionesService, encuestaRepository: Repository<Encuesta>);
    create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta>;
    obtenerPreguntasPorEncuesta(encuestaId: number): Promise<any[]>;
    findOne(id: number): string;
    update(id: number, updatePreguntaDto: UpdatePreguntaDto): string;
    remove(id: number): string;
}
