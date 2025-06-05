import { Repository } from 'typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
export declare class EncuestasService {
    private encuestaRepo;
    private readonly preguntasService;
    private readonly opcionService;
    private readonly respuestasService;
    constructor(encuestaRepo: Repository<Encuesta>, preguntasService: PreguntasService, opcionService: OpcionesService, respuestasService: RespuestasService);
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
    findByCodigo(codigo: string): Promise<Encuesta>;
    actualizarEstado(codigo: string, activa: boolean): Promise<Encuesta>;
    actualizarFechaVencimiento(codigo: string, fecha: Date): Promise<Encuesta>;
    update(id: number, updateEncuestaDto: UpdateEncuestaDto): Promise<Encuesta>;
    remove(id: number): Promise<boolean>;
}
