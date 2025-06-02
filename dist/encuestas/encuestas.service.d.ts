<<<<<<< HEAD
import { CreateEncuestaDto } from "./dto/create-encuesta.dto";
import { Encuesta } from "./entities/encuesta.entity";
import { Repository } from "typeorm";
import { PreguntasService } from "src/preguntas/preguntas.service";
import { OpcionesService } from "src/opciones/opciones.service";
=======
import { Repository } from 'typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';
>>>>>>> fb7df1f7feedf327e177284f1bb4acf368cac1e2
export declare class EncuestasService {
    private encuestaRepo;
    private readonly preguntasService;
    private readonly opcionService;
    constructor(encuestaRepo: Repository<Encuesta>, preguntasService: PreguntasService, opcionService: OpcionesService);
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
<<<<<<< HEAD
    findByCodigo(codigo: string): Promise<Encuesta>;
    actualizarEstado(codigo: string, activa: boolean): Promise<Encuesta>;
    actualizarFechaVencimiento(codigo: string, fecha: Date): Promise<Encuesta>;
=======
    findByCodigo(codigo: string): Promise<any>;
    update(id: number, updateEncuestaDto: UpdateEncuestaDto): Promise<Encuesta>;
    remove(id: number): Promise<boolean>;
>>>>>>> fb7df1f7feedf327e177284f1bb4acf368cac1e2
}
