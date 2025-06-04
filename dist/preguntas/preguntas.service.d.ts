import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Repository } from 'typeorm';
import { Pregunta } from './entities/pregunta.entity';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
export declare class PreguntasService {
    private readonly preguntaRepository;
    private readonly opcionesService;
    private readonly respuestaAbiertaRepository;
    private readonly respuestaOpcionRepository;
    private readonly encuestaRepository;
    constructor(preguntaRepository: Repository<Pregunta>, opcionesService: OpcionesService, respuestaAbiertaRepository: Repository<RespuestaAbierta>, respuestaOpcionRepository: Repository<RespuestaOpcion>, encuestaRepository: Repository<Encuesta>);
    create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta>;
    obtenerPreguntasPorEncuesta(encuestaId: number): Promise<any[]>;
    findOne(id: number): string;
    remove(id: number): Promise<void>;
    update(id: number, updateDto: UpdatePreguntaDto): Promise<any>;
}
