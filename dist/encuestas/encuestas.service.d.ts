import { Repository } from 'typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';
export declare class EncuestasService {
    private encuestaRepository;
    private readonly preguntasService;
    private readonly opcionService;
    private readonly respuestasService;
    private readonly respuestasAbiertasService;
    private readonly respuestasOpcionesService;
    constructor(encuestaRepository: Repository<Encuesta>, preguntasService: PreguntasService, opcionService: OpcionesService, respuestasService: RespuestasService, respuestasAbiertasService: RespuestasAbiertasService, respuestasOpcionesService: RespuestasOpcionesService);
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
    findByCodigo(codigo: string): Promise<any>;
    update(id: number, updateEncuestaDto: UpdateEncuestaDto): Promise<Encuesta>;
    remove(id: number): Promise<boolean>;
}
