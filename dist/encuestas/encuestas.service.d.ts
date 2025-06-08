import { Repository } from 'typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
export declare class EncuestasService {
    private encuestaRepo;
    private readonly respuestaRepository;
    private readonly preguntasService;
    private readonly opcionService;
    private readonly respuestasService;
    private readonly respuestasAbiertasService;
    private readonly respuestasOpcionesService;
    constructor(encuestaRepo: Repository<Encuesta>, respuestaRepository: Repository<Respuesta>, preguntasService: PreguntasService, opcionService: OpcionesService, respuestasService: RespuestasService, respuestasAbiertasService: RespuestasAbiertasService, respuestasOpcionesService: RespuestasOpcionesService);
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
    findByCodigo(codigo: string): Promise<Encuesta>;
    actualizarEstado(codigo: string, activa: boolean): Promise<Encuesta>;
    actualizarFechaVencimiento(codigo: string, fecha: Date): Promise<Encuesta>;
    update(id: number, updateDto: UpdateEncuestaDto): Promise<any>;
    remove(id: number): Promise<boolean>;
}
