import { Injectable, Inject, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as QRCode from 'qrcode';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailerService: MailerService,
    @Inject('CLOUDINARY') private readonly cloudinary,
  ) {
    const missing: string[] = [];
    if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME');
    if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY');
    if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET');

    if (missing.length > 0) {
      this.logger.warn(`Variables de entorno Cloudinary faltantes: ${missing.join(', ')}`);
    } else {
      this.logger.log('Cloudinary config cargada correctamente');
    }
  }

  //Servicio que se inyecta en encuestas.service para enviar mail cuando se hace create de Encuesta realizado por Monica Zuluaga
  async enviarEnlaceEncuesta(
    email: string,
    nombre: string,
    codigo_respuesta: string,
    codigo_resultados: string,
  ) {
    try {
      if (!email || !nombre || !codigo_respuesta || !codigo_resultados) {
        throw new Error('Faltan datos requeridos para enviar el correo');
      }

      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
      const enlaceRespuestas = `${baseUrl}/responder/${codigo_respuesta}`;
      const enlaceResultados = `${baseUrl}/resultados/${codigo_resultados}`;
      const enlaceEditar = `${baseUrl}/encuesta/${codigo_resultados}/editar`;

      this.logger.log(`Generando QR para: ${enlaceRespuestas}`);
      const urlQr = await this.generarYSubirQR(enlaceRespuestas, `qr_${codigo_respuesta}_${Date.now()}`);

      this.logger.log(`Enviando email a: ${email}`);
      await this.mailerService.sendMail({
        to: email,
        subject: `Enlace para responder la encuesta: ${nombre}`,
        template: './enlace',
        context: {
          nombre,
          enlaceRespuestas,
          enlaceResultados,
          enlaceEditar,
          urlQr,
        },
      });

      this.logger.log('Email enviado correctamente');
    } catch (error) {
      this.logger.error(`Error al enviar email a ${email}`, error.stack);
      throw new Error(`Fallo al enviar encuesta a ${email}: ${error.message}`);
    }
  }

  //Funcion adicional realizada por Esteban Herrero
  private async generarYSubirQR(url: string, nombreArchivo: string): Promise<string> {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    const base64Str = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    const uploadResponse = await this.cloudinary.uploader.upload(
      `data:image/png;base64,${base64Str}`,
      {
        folder: 'qrcodes_encuestas',
        public_id: nombreArchivo,
      },
    );
    return uploadResponse.secure_url;
  }
}
