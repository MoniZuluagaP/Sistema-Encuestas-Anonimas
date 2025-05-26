import { OpcionesService } from './opciones.service';
import { CreateOpcionDto } from './dto/create-opcion.dto';
export declare class OpcionesController {
    private readonly opcionesService;
    constructor(opcionesService: OpcionesService);
    create(createOpcionDto: CreateOpcionDto): Promise<import("./entities/opciones.entity").Opcion>;
    findOpcionesByPregunta(preguntaId: number): Promise<import("./entities/opciones.entity").Opcion[]>;
}
