import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaOpcionSimple } from './entities/respuesta-opcion-simple.entity';
import { CreateRespuestaOpcionSimpleDto } from './dto/create-respuestas-opcion-simple.dto';

@Injectable()
export class RespuestasOpcionSimpleService {

  constructor(
    @InjectRepository(RespuestaOpcionSimple)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcionSimple>,

    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,

    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}

  async create(createRespuestaOpcionDto: CreateRespuestaOpcionSimpleDto): Promise<RespuestaOpcionSimple> {
    const opcion = await this.opcionRepository.findOne({
      where: { id: createRespuestaOpcionDto.opcionId },
    });

    if (!opcion) {
      throw new NotFoundException('Opción no encontrada');
    }

    const respuesta = await this.respuestaRepository.findOne({ where: { id: createRespuestaOpcionDto.respuestaId } });

    if (!respuesta) {
      throw new NotFoundException('Respuesta (conjunto) no encontrada');
    }

    // Comprobar que no hay respuestas duplicadas en  las de opcion
    const yaExiste = await this.respuestaOpcionRepository.findOne({
      where: {
        respuesta: { id: createRespuestaOpcionDto.respuestaId },
        opcion: { id: createRespuestaOpcionDto.opcionId },
      },
    });

    if (yaExiste) {
      throw new ConflictException('Esta opción de respuesta ya fue seleccionada.');
    }

    const nueva = this.respuestaOpcionRepository.create({
      opcion,
      respuesta,
      preguntaId: createRespuestaOpcionDto.preguntaId,
    });

    return this.respuestaOpcionRepository.save(nueva);
  }

  async findRespuestasAbiertasByRespuestaIdYPreguntaId(respuestaId: number, preguntaId: number) {
    return this.respuestaOpcionRepository.findOne({
      where: { respuestaId, preguntaId },
    });
  }

async findByRespuestaId(respuestaId: number): Promise<RespuestaOpcionSimple[]> {
  return this.respuestaOpcionRepository.find({
    where: { respuesta: { id: respuestaId } },
    relations: ['opcion', 'opcion.pregunta'],
  });
}

//Las respuestas de tipo opciones de todos los registros relacionados con una encuesta
async findByRespuestaIds(respuestaIds: number[]): Promise<RespuestaOpcionSimple[]> {
  return this.respuestaOpcionRepository.find({
    where: { respuesta: { id: In(respuestaIds) } },
    relations: ['respuesta', 'opcion', 'opcion.pregunta'],
  });
}

async obtenerOpcionesPorPregunta(preguntaId: number) {
  return this.respuestaOpcionRepository.find({
    where: { opcion: { pregunta: { id: preguntaId } } },
    relations: ['opcion', 'respuesta'],
  });
}
}