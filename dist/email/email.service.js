"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const QRCode = require("qrcode");
let EmailService = EmailService_1 = class EmailService {
    mailerService;
    cloudinary;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(mailerService, cloudinary) {
        this.mailerService = mailerService;
        this.cloudinary = cloudinary;
        const missing = [];
        if (!process.env.CLOUDINARY_CLOUD_NAME)
            missing.push('CLOUDINARY_CLOUD_NAME');
        if (!process.env.CLOUDINARY_API_KEY)
            missing.push('CLOUDINARY_API_KEY');
        if (!process.env.CLOUDINARY_API_SECRET)
            missing.push('CLOUDINARY_API_SECRET');
        if (missing.length > 0) {
            this.logger.warn(`Variables de entorno Cloudinary faltantes: ${missing.join(', ')}`);
        }
        else {
            this.logger.log('Cloudinary config cargada correctamente');
        }
    }
    async enviarEnlaceEncuesta(email, nombre, codigo_respuesta, codigo_resultados) {
        try {
            if (!email || !nombre || !codigo_respuesta || !codigo_resultados) {
                throw new Error('Faltan datos requeridos para enviar el correo');
            }
            const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            const enlaceRespuestas = `${baseUrl}/responder/${codigo_respuesta}`;
            const enlaceResultados = `${baseUrl}/resultados/${codigo_resultados}`;
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
                    urlQr,
                },
            });
            this.logger.log('Email enviado correctamente');
        }
        catch (error) {
            this.logger.error(`Error al enviar email a ${email}`, error.stack);
            throw new Error(`Fallo al enviar encuesta a ${email}: ${error.message}`);
        }
    }
    async generarYSubirQR(url, nombreArchivo) {
        const qrCodeDataUrl = await QRCode.toDataURL(url);
        const base64Str = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
        const uploadResponse = await this.cloudinary.uploader.upload(`data:image/png;base64,${base64Str}`, {
            folder: 'qrcodes_encuestas',
            public_id: nombreArchivo,
        });
        return uploadResponse.secure_url;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('CLOUDINARY')),
    __metadata("design:paramtypes", [mailer_1.MailerService, Object])
], EmailService);
//# sourceMappingURL=email.service.js.map