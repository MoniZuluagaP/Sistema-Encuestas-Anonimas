// src/respuestas/respuestas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Respuesta } from './entities/respuesta.entity';
import { CreateRespuestasDto, RespuestaAbiertaDto, RespuestaOpcionDto } from './dto/create-respuesta.dto';

import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionSimpleService } from 'src/respuestas-opcion-simple/respuesta-opcion-simple.service';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,

    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,

    private readonly respuestasAbiertasService: RespuestasAbiertasService,
    private readonly respuestasOpcionesService: RespuestasOpcionSimpleService,
  ) {}

  // async create(createRespuestaDto: CreateRespuestaDto): Promise<Respuesta> {
  //   // 1) Buscar la encuesta por su código de resultados
  //   const encuesta = await this.encuestaRepository.findOne({
  //     where: { codigo_resultados: createRespuestaDto.codigoEncuesta },
  //   });
  //   if (!encuesta) {
  //     throw new NotFoundException('Encuesta no encontrada');
  //   }

  //   // 2) Crear el registro maestro en tabla `respuesta`
  //   const nuevaRespuesta = this.respuestaRepository.create({ encuesta });
  //   const respuestaGuardada = await this.respuestaRepository.save(nuevaRespuesta);

  //   // 3) Insertar respuestas abiertas, si vienen en el DTO
  //   if (Array.isArray(createRespuestaDto.abiertas)) {
  //     for (const abiertaDto of createRespuestaDto.abiertas as RespuestaAbiertaDto[]) {
  //       await this.respuestasAbiertasService.create({
  //         preguntaId: abiertaDto.preguntaId,
  //         texto: abiertaDto.texto,
  //         respuestaId: respuestaGuardada.id,
  //       });
  //     }
  //   }

  //   // 4) Insertar respuestas de opción, si vienen en el DTO
  //   if (Array.isArray(createRespuestaDto.opciones)) {
  //     for (const opcionDto of createRespuestaDto.opciones as RespuestaOpcionDto[]) {
  //       await this.respuestasOpcionesService.create({
  //         preguntaId: opcionDto.preguntaId,
  //         opcionId: opcionDto.opcionId,
  //         respuestaId: respuestaGuardada.id,
  //       });
  //     }
  //   }

  //   // 5) Devolver la entidad Respuesta principal
  //   return respuestaGuardada;
  // }

  async create(createRespuestasDto: CreateRespuestasDto): Promise<Respuesta> {
    // 1) Buscar la encuesta por su código de resultados
    const encuesta = await this.encuestaRepository.findOne({
      where: { codigo_respuesta: createRespuestasDto.codigoEncuesta },
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    const nuevaRespuesta = this.respuestaRepository.create({ encuesta });
    return this.respuestaRepository.save(nuevaRespuesta);
  }

   //Devuelve un solo objeto Respuesta (o null)
  async findByEncuestaId(encuestaId: number): Promise<Respuesta | null> {
    return this.respuestaRepository.findOne({
      where: { encuesta: { id: encuestaId } },
      relations: ['encuesta'],
    });
  }


  //Devuelve todos los objetos respuesta relacionados con una encuesta especifica
  async findAllByEncuestaId(encuestaId: number): Promise<Respuesta[]> {
  return this.respuestaRepository.find({
    where: { encuesta: { id: encuestaId } },
    relations: ['encuesta'],
  });
}

}
