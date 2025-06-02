import { CreateEncuestaDto } from "./dto/create-encuesta.dto";
import { Encuesta } from "./entities/encuesta.entity";
import { Repository } from "typeorm";
import { PreguntasService } from "src/preguntas/preguntas.service";
import { OpcionesService } from "src/opciones/opciones.service";
export declare class EncuestasService {
    private encuestaRepo;
    private readonly preguntasService;
    private readonly opcionService;
    constructor(encuestaRepo: Repository<Encuesta>, preguntasService: PreguntasService, opcionService: OpcionesService);
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
    findByCodigo(codigo: string): Promise<Encuesta>;
    actualizarEstado(codigo: string, activa: boolean): Promise<Encuesta>;
    actualizarFechaVencimiento(codigo: string, fecha: Date): Promise<Encuesta>;
}
