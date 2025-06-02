<<<<<<< HEAD
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateEncuestaDto } from "./dto/create-encuesta.dto";
import { Encuesta } from "./entities/encuesta.entity";
import { v4 as uuidv4 } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PreguntasService } from "src/preguntas/preguntas.service";
import { OpcionesService } from "src/opciones/opciones.service";
=======
import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';    // ← importa el DTO
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
>>>>>>> fb7df1f7feedf327e177284f1bb4acf368cac1e2

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
<<<<<<< HEAD
=======
async update(id: number, updateEncuestaDto: UpdateEncuestaDto): Promise<Encuesta> {
    // 3.1) Buscamos la encuesta por su ID
    const encuesta = await this.encuestaRepository.findOne({ where: { id } });
    if (!encuesta) {
      throw new NotFoundException(`Encuesta con id ${id} no encontrada`);
    }

    // 3.2) Mezclamos los campos nuevos en la entidad encontrada
    Object.assign(encuesta, updateEncuestaDto);

    // 3.3) Guardamos los cambios y devolvemos la entidad actualizada
    return this.encuestaRepository.save(encuesta);
  }
async remove(id: number): Promise<boolean> {
    // 1) Verifico que exista
    const encuesta = await this.encuestaRepository.findOne({ where: { id } });
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
    const result = await this.encuestaRepository.delete(id);
    return (result.affected ?? 0) > 0;
   } }

>>>>>>> fb7df1f7feedf327e177284f1bb4acf368cac1e2
