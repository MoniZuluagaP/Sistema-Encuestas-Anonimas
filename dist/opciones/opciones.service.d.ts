import { CreateOpcionDto } from './dto/create-opcion.dto';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';
import { Repository } from 'typeorm';
export declare class OpcionesService {
    private readonly opcionRepo;
    private readonly preguntaRepo;
    constructor(opcionRepo: Repository<Opcion>, preguntaRepo: Repository<Pregunta>);
    findOpcionesByPregunta(preguntaId: number): Promise<Opcion[]>;
    createOpcion(createOpcionDto: CreateOpcionDto): Promise<Opcion>;
}
