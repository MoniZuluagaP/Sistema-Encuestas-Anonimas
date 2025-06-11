import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { TipoRespuesta } from 'src/preguntas/entities/pregunta.entity';
import { CreateRespuestaAbiertaDto } from './dto/create-respuestas-abiertas.dto';

@Injectable()
export class RespuestasAbiertasService {
  constructor(
    @InjectRepository(RespuestaAbierta)
    private readonly respuestaAbiertaRepository: Repository<RespuestaAbierta>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,

    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}

  // Se crea una respuesta de tipo abierta y se guarda relacionandola con su pregunta y con el registro completo de respuestas
async create(createRespuestaAbiertaDto: CreateRespuestaAbiertaDto): Promise<RespuestaAbierta> {
  const pregunta = await this.preguntaRepository.findOne({
    where: { id: createRespuestaAbiertaDto.preguntaId },
  });

  if (!pregunta) {
    throw new NotFoundException('Pregunta no encontrada');
  }

  if (pregunta.tipo !== TipoRespuesta.ABIERTA) {
    throw new BadRequestException('La pregunta no es de tipo abierta');
  }

  const respuesta = await this.respuestaRepository.findOne({
    where: { id: createRespuestaAbiertaDto.respuestaId },
  });

  if (!respuesta) {
    throw new NotFoundException('No se encuentra el registro de respuestas de la encuesta');
  }

  // Validación para evitar enviar dos respuestas de la misma pregunta en una misma participacion
  const yaExiste = await this.respuestaAbiertaRepository.findOne({
    where: {
      pregunta: { id: createRespuestaAbiertaDto.preguntaId },
      respuesta: { id: createRespuestaAbiertaDto.respuestaId },
    },
  });

  if (yaExiste) {
    throw new ConflictException('Ya existe una respuesta para esta pregunta ');
  }

  const nueva = this.respuestaAbiertaRepository.create({
    texto: createRespuestaAbiertaDto.texto,
    pregunta,
    respuesta,
  });

  return this.respuestaAbiertaRepository.save(nueva);
}


  // Busca las respuestas abiertas de un registro de respuestas completo de una encuesta
  async findRespuestasAbiertasByRespuestaId(respuestaId: number): Promise<RespuestaAbierta[]> {
  return this.respuestaAbiertaRepository.find({
    where: { respuesta: { id: respuestaId } },
    relations: ['pregunta'], // para saber a qué pregunta corresponde cada una
  });
}


// Busca las respuestas abiertas de varios registros de respuestas de una encuesta
async findRespuestasAbiertasByRespuestaIds(respuestaIds: number[]): Promise<RespuestaAbierta[]> {
  return this.respuestaAbiertaRepository.find({
    where: { respuesta: { id: In(respuestaIds) } },
    relations: ['pregunta', 'respuesta'],
  });
}

async obtenerAbiertasPorPregunta(preguntaId: number) {
    return this.respuestaAbiertaRepository.find({
      where: { pregunta: { id: preguntaId } },
      relations: ['respuesta'],
    });
  }

  async findRespuestasAbiertasByRespuestaIdYPreguntaId(respuestaId: number, preguntaId: number) {
    return this.respuestaAbiertaRepository.findOne({
      where: { respuestaId, preguntaId },
    });
  }
}