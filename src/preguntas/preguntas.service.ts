import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Repository } from 'typeorm';
import { Pregunta, TipoRespuesta } from './entities/pregunta.entity';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
import { In } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,

    private readonly opcionesService: OpcionesService,
    @InjectRepository(RespuestaAbierta)
    private readonly respuestaAbiertaRepository: Repository<RespuestaAbierta>,

    @InjectRepository(RespuestaOpcion)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcion>,

    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
  ) {}
  
  //Crear una pregunta y asignarla a la encuesta segun el Id 
  async create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
  
    const encuesta = await this.encuestaRepository.findOneBy({ id: createPreguntaDto.encuestaId });

    if (!encuesta) {
      throw new NotFoundException(
        `Encuesta con ID ${createPreguntaDto.encuestaId} no encontrada`,
      );
    }

    const nuevaPregunta = this.preguntaRepository.create({
      numero: createPreguntaDto.numero,
      texto: createPreguntaDto.texto,
      tipo: createPreguntaDto.tipo,
      encuesta,
    });

    return this.preguntaRepository.save(nuevaPregunta);
}


  async obtenerPreguntasPorEncuesta(encuestaId: number): Promise<any[]> {
    const preguntas = await this.preguntaRepository.find({
      where: { encuesta: { id: encuestaId } },
    });

    return Promise.all(
      preguntas.map(async (pregunta) => {
        const esTipoConOpciones =
          pregunta.tipo === TipoRespuesta.OPCION_SIMPLE ||
          pregunta.tipo === TipoRespuesta.OPCION_MULTIPLE;

        if (esTipoConOpciones) {
          const opciones = await this.opcionesService.findOpcionesByPregunta(pregunta.id);
          return { ...pregunta, opciones };
        }

        // Si es pregunta abierta, no se incluye el campo `opciones`
        return { ...pregunta };
      }),
    );
}


  findOne(id: number) {
    return `This action returns a #${id} pregunta`;
  }

  //update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
  //  return `This action updates a #${id} pregunta`;
  //}

  // ✅ Eliminar solo si no tiene respuestas asociadas
  
  async remove(id: number): Promise<void> {
  // 1. Buscar la pregunta
  const pregunta = await this.preguntaRepository.findOne({ where: { id } });
  if (!pregunta) {
    throw new NotFoundException(`Pregunta con ID ${id} no encontrada.`);
  }

  // 2. Verificar si tiene respuestas abiertas asociadas
  const tieneRespuestasAbiertas = await this.respuestaAbiertaRepository.count({
    where: { pregunta: { id } },
  });

  // 3. Verificar si tiene respuestas de opción asociadas
  const opciones = await this.opcionesService.findOpcionesByPregunta(id);
  const opcionesIds = opciones.map(op => op.id);

  let tieneRespuestasOpciones = 0;
  if (opcionesIds.length > 0) {
    tieneRespuestasOpciones = await this.respuestaOpcionRepository.count({
      where: {
        opcion: { id: In(opcionesIds) },
      },
    });
  }

  // 4. Lanzar error si hay respuestas
  //if (tieneRespuestasAbiertas > 0 || tieneRespuestasOpciones > 0) {
  //  throw new Error(`La pregunta no puede eliminarse porque tiene respuestas asociadas.`);
  //}
   if (tieneRespuestasAbiertas > 0 || tieneRespuestasOpciones > 0) {
    throw new BadRequestException('La pregunta no puede eliminarse porque tiene respuestas asociadas.');
  }

  // 5. Eliminar si no hay respuestas
  await this.preguntaRepository.remove(pregunta);
}

async update(id: number, updateDto: UpdatePreguntaDto): Promise<any> {
  // 1. Buscar si la pregunta existe
  const pregunta = await this.preguntaRepository.findOne({ where: { id } });

  if (!pregunta) {
    throw new NotFoundException(`Pregunta con ID ${id} no encontrada.`);
  }

  // 2. Actualizar los datos
  const preguntaActualizada = Object.assign(pregunta, updateDto);

  await this.preguntaRepository.save(preguntaActualizada);

  // 3. Retornar respuesta con mensaje
  return {
    message: 'Pregunta actualizada exitosamente.',
    data: preguntaActualizada,
  };
}


  }


