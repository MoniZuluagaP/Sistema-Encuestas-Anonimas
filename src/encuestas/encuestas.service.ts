import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto'; 
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

export class EncuestasService {
  
  constructor(
    @InjectRepository(Encuesta)
    private encuestaRepo: Repository<Encuesta>,
    @InjectRepository(Respuesta)  
    private readonly respuestaRepository: Repository<Respuesta>,
    private readonly preguntasService: PreguntasService,
    private readonly opcionService: OpcionesService,
    private readonly respuestasService: RespuestasService,
    private readonly respuestasAbiertasService: RespuestasAbiertasService,
    private readonly respuestasOpcionesService: RespuestasOpcionesService,
  ) {}

  create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta> {
    const nuevaEncuesta = this.encuestaRepo.create({
      ...createEncuestaDto,
      codigo_respuesta: uuidv4(),
      codigo_resultados: uuidv4(),
    });
   

    return this.encuestaRepo.save(nuevaEncuesta);
  }

  /* // Buscar encuesta por código (puede ser de respuesta o de resultados)
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
      // Si no está activa y es código de respuesta, no permitir acceso. Si es encuestador, permitir acceso
      if (esCodigoRespuesta) {
        throw new BadRequestException("Encuesta deshabilitada");
      }
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

    // Si pasó todas las validaciones, traer preguntas asociadas y luego las respuestas si es para el encuestador
    const mostrarRespuestas: boolean = esCodigoAdmin
    const preguntas: Pregunta[]= await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

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
 */

async findByCodigo(codigo: string): Promise<Encuesta> {
  const encuesta = await this.encuestaRepo.findOne({
    where: [
      { codigo_respuesta: codigo },
      { codigo_resultados: codigo },
    ],
  });

  if (!encuesta) {
    throw new NotFoundException("Encuesta no encontrada");
  }

  const esCodigoRespuesta = codigo === encuesta.codigo_respuesta;
  const esCodigoAdmin = codigo === encuesta.codigo_resultados;

  if (!encuesta.activa && esCodigoRespuesta) {
    throw new BadRequestException("Encuesta deshabilitada");
  }

  if (encuesta.fecha_vencimiento) {
    const ahora = new Date();
    const vencimiento = new Date(encuesta.fecha_vencimiento);
    if (vencimiento < ahora && esCodigoRespuesta) {
      throw new BadRequestException("Encuesta vencida");
    }
  }

  const mostrarRespuestas = esCodigoAdmin;
  const preguntas: Pregunta[] = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

  let respuestasAbiertas: RespuestaAbierta[] = [];
  let respuestasOpciones: RespuestaOpcion[] = [];

  if (mostrarRespuestas) {
    const respuestas: Respuesta[] = await this.respuestasService.findAllByEncuestaId(encuesta.id);
    const respuestaIds = respuestas.map(r => r.id);

    respuestasAbiertas = await this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaIds(respuestaIds);
    respuestasOpciones = await this.respuestasOpcionesService.findByRespuestaIds(respuestaIds);
  }

  const preguntasConOpcionesYRespuestas = await Promise.all(
    preguntas.map(async (pregunta: Pregunta) => {
      let opciones: Opcion[] = [];

      if (pregunta.tipo !== TipoRespuesta.ABIERTA) {
        opciones = await this.opcionService.findOpcionesByPregunta(pregunta.id);
      }

      const respuestas = mostrarRespuestas
        ? pregunta.tipo === TipoRespuesta.ABIERTA
          ? respuestasAbiertas.filter(r => r.pregunta.id === pregunta.id)
          : respuestasOpciones
              .filter(ro => ro.opcion.pregunta.id === pregunta.id)
              .map(ro => ro.opcion)
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


  

  async update(id: number, updateDto: UpdateEncuestaDto): Promise<any> {
  const encuesta = await this.encuestaRepo.findOne({ where: { id } });
  if (!encuesta) {
    throw new NotFoundException(`Encuesta con ID ${id} no encontrada.`);
  }

  const cantidadRespuestas = await this.respuestaRepository.count({
    where: { encuesta: { id } },
  });

  if (cantidadRespuestas > 0) {
    throw new BadRequestException('La encuesta no puede modificarse porque ya tiene respuestas.');
  }

  const encuestaActualizada = Object.assign(encuesta, updateDto);

  await this.encuestaRepo.save(encuestaActualizada);

  return {
    message: 'Encuesta actualizada exitosamente.',
    data: encuestaActualizada,
  };
}


async remove(id: number): Promise<boolean> {
    // 1) Verifico que exista
    const encuesta = await this.encuestaRepo.findOne({ where: { id } });
    if (!encuesta) {
      throw new NotFoundException(`Encuesta con id ${id} no encontrada`);
    }

    // 2) Verifico si hay respuestas asociadas
    const respuestasArray = await this.respuestasService.obtenerPorEncuesta(id);
  if (respuestasArray.length > 0) {
    throw new BadRequestException(
      `No se puede eliminar la encuesta ${id} porque ya tiene respuestas`
    );
  }
    // 3) Si no hay respuestas, borro la encuesta
    const result = await this.encuestaRepo.delete(id);
    return (result.affected ?? 0) > 0;
   }

   
}
   

