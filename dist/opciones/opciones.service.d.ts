import { CreateOpcionDto } from './dto/create-opcion.dto';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';
import { Repository } from 'typeorm';
export declare class OpcionesService {
    private readonly opcionRepository;
    private readonly preguntaRepository;
    constructor(opcionRepository: Repository<Opcion>, preguntaRepository: Repository<Pregunta>);
    findOpcionesByPregunta(preguntaId: number): Promise<Opcion[]>;
    createOpcion(createOpcionDto: CreateOpcionDto): Promise<Opcion>;
}
