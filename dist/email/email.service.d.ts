import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    private readonly cloudinary;
    private readonly logger;
    constructor(mailerService: MailerService, cloudinary: any);
    enviarEnlaceEncuesta(email: string, nombre: string, codigo_respuesta: string, codigo_resultados: string): Promise<void>;
    private generarYSubirQR;
}
