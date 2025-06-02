import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateEncuestaDto } from "./dto/create-encuesta.dto";
import { Encuesta } from "./entities/encuesta.entity";
import { v4 as uuidv4 } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PreguntasService } from "src/preguntas/preguntas.service";
import { OpcionesService } from "src/opciones/opciones.service";

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestaRepo: Repository<Encuesta>,
    private readonly preguntasService: PreguntasService,
    private readonly opcionService: OpcionesService,
  ) {}

  create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta> {
    const nuevaEncuesta = this.encuestaRepo.create({
      ...createEncuestaDto,
      codigo_respuesta: uuidv4(),
      codigo_resultados: uuidv4(),
    });
    console.log(nuevaEncuesta);

    return this.encuestaRepo.save(nuevaEncuesta);
  }

  // Buscar encuesta por código (puede ser de respuesta o de resultados)
  async findByCodigo(codigo: string): Promise<Encuesta> {
    // Buscamos la encuesta con el código (respuesta o resultados)
    const encuesta = await this.encuestaRepo.findOne({
      where: [
        { codigo_respuesta: codigo },
        { codigo_resultados: codigo },
      ],
    });

    if (!encuesta) {
      throw new NotFoundException("Encuesta no encontrada");
    }

    // Determinar tipo de código recibido
    const esCodigoRespuesta = codigo === encuesta.codigo_respuesta;
    const esCodigoAdmin = codigo === encuesta.codigo_resultados;

    // Verificar si la encuesta está activa
    if (!encuesta.activa) {
      // Si no está activa y es código de respuesta, no permitir acceso
      if (esCodigoRespuesta) {
        throw new BadRequestException("Encuesta deshabilitada");
      }
      // Si es encuestador, permitir acceso
    }

    // Verificar fecha de vencimiento
    if (encuesta.fecha_vencimiento) {
      const ahora = new Date();
      const vencimiento = new Date(encuesta.fecha_vencimiento);

      if (vencimiento < ahora && esCodigoRespuesta) {
        // Si está vencida y es código de respuesta, no permitir acceso
        throw new BadRequestException("Encuesta vencida");
      }
    }

    // Si pasó todas las validaciones, traer preguntas asociadas
    const preguntas = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

    return {
      ...encuesta,
      preguntas,
    };
  }

  // Habilitar o deshabilitar una encuesta
  async actualizarEstado(codigo: string, activa: boolean): Promise<Encuesta> {
    const encuesta = await this.encuestaRepo.findOne({
      where: { codigo_resultados: codigo },
    });

    if (!encuesta) {
      throw new NotFoundException("Encuesta no encontrada");
    }

    encuesta.activa = activa;
    return this.encuestaRepo.save(encuesta);
  }

  // Establecer o actualizar fecha de vencimiento
  async actualizarFechaVencimiento(codigo: string, fecha: Date): Promise<Encuesta> {
    const encuesta = await this.encuestaRepo.findOne({
      where: { codigo_resultados: codigo },
    });

    if (!encuesta) {
      throw new NotFoundException("Encuesta no encontrada");
    }

    encuesta.fecha_vencimiento = fecha;
    return this.encuestaRepo.save(encuesta);
  }
  /* update(id: number, updateEncuestaDto: UpdateEncuestaDto) {
    return `This action updates a #${id} encuesta`;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} encuesta`;
  } */
}
