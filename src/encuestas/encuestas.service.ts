import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';

import { Pregunta, TipoRespuesta } from 'src/preguntas/entities/pregunta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
    private readonly preguntasService: PreguntasService,
    private readonly opcionService: OpcionesService,
    private readonly respuestasService: RespuestasService,
    private readonly respuestasAbiertasService: RespuestasAbiertasService,
    private readonly respuestasOpcionesService: RespuestasOpcionesService,
  ) {}


  //Crear una encuesta con los datos que vienen del dto y agrega los dos codigos
  create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta> {
    const nuevaEncuesta = this.encuestaRepository.create({
      ...createEncuestaDto,
      codigo_respuesta: uuidv4(),
      codigo_resultados: uuidv4(),
    });

    return this.encuestaRepository.save(nuevaEncuesta);
  }

//Busca una encuesta utilizando el codigo que viene por URL
async findByCodigo(codigo: string): Promise<any> {
  const encuesta: Encuesta | null = await this.encuestaRepository.findOne({
    where: [
      { codigo_respuesta: codigo },
      { codigo_resultados: codigo },
    ],
  });

  if (!encuesta) {
    throw new NotFoundException('Encuesta no encontrada');
  }

  const mostrarRespuestas: boolean = encuesta.codigo_resultados === codigo;

  const preguntas: Pregunta[] = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

  const respuesta: Respuesta | null = mostrarRespuestas
    ? await this.respuestasService.findByEncuestaId(encuesta.id)
    : null;

  const respuestasAbiertas: RespuestaAbierta[] = respuesta
    ? await this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaId(respuesta.id)
    : [];

  const respuestasOpciones: RespuestaOpcion[] = respuesta
    ? await this.respuestasOpcionesService.findByRespuestaId(respuesta.id)
    : [];

  const preguntasConOpcionesYRespuestas = await Promise.all(
    preguntas.map(async (pregunta: Pregunta) => {
      let opciones: Opcion[] = [];
      if (pregunta.tipo !== TipoRespuesta.ABIERTA) {
        opciones = await this.opcionService.findOpcionesByPregunta(pregunta.id);
      }

      const respuestas = mostrarRespuestas
        ? pregunta.tipo === TipoRespuesta.ABIERTA
          ? respuestasAbiertas.filter((respuestaAbierta: RespuestaAbierta) => respuestaAbierta.pregunta.id === pregunta.id)
          : respuestasOpciones
              .filter((respuestaOpcion: RespuestaOpcion) => respuestaOpcion.opcion.pregunta.id === pregunta.id)
              .map((respuestaOpcion: RespuestaOpcion) => respuestaOpcion.opcion)
        : [];

      return {
        ...pregunta,
        opciones,
        respuestas,
      };
    }),
  );

  return {
    ...encuesta,
    preguntas: preguntasConOpcionesYRespuestas,
  };
}

}