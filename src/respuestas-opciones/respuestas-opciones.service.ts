import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaOpcion } from './entities/respuesta-opciones.entity';
import { CreateRespuestaOpcionDto } from './dto/create-respuestas-opciones.dto';
import { TipoRespuesta } from 'src/preguntas/entities/pregunta.entity';

@Injectable()
export class RespuestasOpcionesService {
  
  constructor(
    @InjectRepository(RespuestaOpcion)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcion>,

    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,

    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}

  async create(createRespuestaOpcionDto: CreateRespuestaOpcionDto): Promise<RespuestaOpcion> {
  const opcion = await this.opcionRepository.findOne({
    where: { id: createRespuestaOpcionDto.opcionId },
    relations: ['pregunta'],
  });

  if (!opcion) {
    throw new NotFoundException('Opción no encontrada');
  }

  const pregunta = opcion.pregunta;

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
    relations: ['opcion', 'respuesta'],
  });

  if (yaExiste) {
    throw new ConflictException('Esta opción de respuesta ya fue seleccionada.');
  }

  //Controlar que solo haya una respuesta porque es de opcion simple
  if (pregunta.tipo === TipoRespuesta.OPCION_SIMPLE ) {
    const yaRespondida = await this.respuestaOpcionRepository.findOne({
      where: {
        respuesta: { id: createRespuestaOpcionDto.respuestaId },
        opcion: { pregunta: { id: pregunta.id } },
      },
      relations: ['opcion', 'opcion.pregunta'],
    });

    if (yaRespondida) {
      throw new ConflictException('Solo puede haber una respuesta para respuestas de opción simple.');

    }
  }

  const nueva = this.respuestaOpcionRepository.create({
    opcion,
    respuesta,
  });

  return this.respuestaOpcionRepository.save(nueva);
}

async findByRespuestaId(respuestaId: number): Promise<RespuestaOpcion[]> {
  return this.respuestaOpcionRepository.find({
    where: { respuesta: { id: respuestaId } },
    relations: ['opcion', 'opcion.pregunta'],
  });
}

//Las respuestas de tipo opciones de todos los registros relacionados con una encuesta
async findByRespuestaIds(respuestaIds: number[]): Promise<RespuestaOpcion[]> {
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