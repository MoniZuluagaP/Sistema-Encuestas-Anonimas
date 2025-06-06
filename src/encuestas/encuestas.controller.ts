/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete,NotFoundException, } from '@nestjs/common';
import { EncuestasService } from './encuestas.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';
import { EmailService } from '../email/email.service';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';

@Controller('encuesta')
export class EncuestasController {
  constructor(
    private readonly encuestasService: EncuestasService,
    private readonly emailService: EmailService,  // inyectamos el servicio de email
  ) {}

  @Get()
  startEncuesta(): string {
    return 'ACA DEBE IRSE ARMANDO LA ENCUESTA, ESTAN LOS CAMPOS PARA COMPLETAR Y CREAR LA ENCUESTA Y EL BOTON PARA HACER';
  }

  @Post()
  async create(@Body() createEncuestaDto: CreateEncuestaDto): Promise<Encuesta> {
    // 1. Crear la encuesta y guardar en DB
    const encuestaCreada = await this.encuestasService.create(createEncuestaDto);

    // 2. Extraer datos para el email
    const email = createEncuestaDto.email; 
    const nombre = createEncuestaDto.nombre;
    const codigo_respuesta = encuestaCreada.codigo_respuesta;
    const codigo_resultados = encuestaCreada.codigo_resultados;

    // 3. Enviar el email con los enlaces
    await this.emailService.enviarEnlaceEncuesta(email, nombre, codigo_respuesta, codigo_resultados);

    // 4. Retornar la encuesta creada
    return encuestaCreada;
  }

  @Get(':codigo')
  findByCodigo(@Param('codigo') codigo: string): Promise<Encuesta> {
    return this.encuestasService.findByCodigo(codigo);
  }


    @Patch(':id')
  update(@Param('id') id: string, @Body() updateEncuestaDto: UpdateEncuestaDto) {
    return this.encuestasService.update(+id, updateEncuestaDto);
  } 


  @Delete(':id')
  async removeEncuesta(@Param('id') id: string) {
    const eliminado = await this.encuestasService.remove(+id);
    if (!eliminado) {
      throw new NotFoundException(`Encuesta con id ${id} no encontrada`);
    }
    return { mensaje: `Encuesta ${id} eliminada` };
  }
  }
  
  
