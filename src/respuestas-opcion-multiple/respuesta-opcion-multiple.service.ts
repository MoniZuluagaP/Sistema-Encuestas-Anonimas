import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Respuesta } from '../respuestas/entities/respuesta.entity';
import { Opcion } from '../opciones/entities/opciones.entity';
import { RespuestaOpcionMultiple } from './entities/respuesta-opcion-multiple.entity';
import { CreateRespuestaOpcionMultipleDto } from './dto/create-respuestas-opcion-multiple.dto';
import { RespuestaOpcionMultipleConOpciones } from 'src/interfaces/respuesta-opcion-multiple-con-opciones.interface';

@Injectable()
export class RespuestasOpcionMultipleService {
  constructor(
    @InjectRepository(RespuestaOpcionMultiple)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcionMultiple>,

    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,

    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>
  ) {}

  async create(
    createRespuestaOpcionMultipleDto: CreateRespuestaOpcionMultipleDto
  ): Promise<RespuestaOpcionMultiple> {
    const opcion = await this.opcionRepository.find({
      where: { id: In(createRespuestaOpcionMultipleDto.opcionIds) },
    });

    if (
      !opcion ||
      opcion.length < createRespuestaOpcionMultipleDto.opcionIds.length
    ) {
      throw new NotFoundException('Opciones no encontradas');
    }

    const respuesta = await this.respuestaRepository.findOne({
      where: { id: createRespuestaOpcionMultipleDto.respuestaId },
    });

    if (!respuesta) {
      throw new NotFoundException('Respuesta (conjunto) no encontrada');
    }

    // Comprobar que no hay respuestas duplicadas en  las de opcion
    const yaExiste = await this.respuestaOpcionRepository.findOne({
      where: {
        respuestaId: createRespuestaOpcionMultipleDto.respuestaId,
        preguntaId: createRespuestaOpcionMultipleDto.preguntaId,
      },
    });

    if (yaExiste) {
      throw new ConflictException(
        'Esta opción de respuesta ya fue seleccionada.'
      );
    }

    const nueva = this.respuestaOpcionRepository.create(
      createRespuestaOpcionMultipleDto
    );

    return this.respuestaOpcionRepository.save(nueva);
  }

  async findRespuestasAbiertasByRespuestaIdYPreguntaId(
    respuestaId: number,
    preguntaId: number
  ) {
    return this.respuestaOpcionRepository.findOne({
      where: { respuestaId, preguntaId },
    });
  }

  async findByRespuestaIds(
    respuestaIds: number[],
  ): Promise<RespuestaOpcionMultipleConOpciones[]> {
    const respuestas = await this.respuestaOpcionRepository.find({
      where: { respuestaId: In(respuestaIds) },
      relations: ['respuesta'],
    });

    let respuestasConOpciones: RespuestaOpcionMultipleConOpciones[] = [];

    for (const respuesta of respuestas) {
      const opciones = await this.opcionRepository.findBy({
        id: In(respuesta.opcionIds),
      });

      respuestasConOpciones.push({ ...respuesta, opciones });
    }

    return respuestasConOpciones;
  }
}
