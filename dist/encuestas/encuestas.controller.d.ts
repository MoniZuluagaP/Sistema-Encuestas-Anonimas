import { EncuestasService } from './encuestas.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';
import { EmailService } from '../email/email.service';
export declare class EncuestasController {
    private readonly encuestasService;
    private readonly emailService;
    constructor(encuestasService: EncuestasService, emailService: EmailService);
    startEncuesta(): string;
    create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta>;
    findByCodigo(codigo: string): Promise<Encuesta>;
}
