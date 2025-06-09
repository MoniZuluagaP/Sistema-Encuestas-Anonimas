import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { UpdateOpcioneDto } from './dto/update-opcione.dto';
import { Pregunta, TipoRespuesta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
@Injectable()
export class OpcionesService {
  
  constructor(
    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,

    @InjectRepository(RespuestaOpcion)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcion>,
  ) {}
  

  //Si la pregunta es de tipo de respuesta con opciones, busca la pregunta y sus opciones de respuesta para poderlo utilizar en el encuestas.service
    async findOpcionesByPregunta(preguntaId: number): Promise<Opcion[]> {
    const pregunta = await this.preguntaRepository.findOne({ where: { id: preguntaId } });

    if (!pregunta) {
      throw new NotFoundException('Pregunta no encontrada');
    }

    const esTipoConOpciones =
      pregunta.tipo === TipoRespuesta.OPCION_SIMPLE ||
      pregunta.tipo === TipoRespuesta.OPCION_MULTIPLE;

    if (!esTipoConOpciones) {
      return [];
    }

    return this.opcionRepository.find({
      where: { pregunta: { id: preguntaId } }
    });
  }
  

  //Crear opcion de respuesta de una pregunta con tipo respuesta con opcion simple o respuesta con opcion multiple
  async createOpcion(createOpcionDto: CreateOpcionDto): Promise<Opcion> {
  const pregunta = await this.preguntaRepository.findOne({
    where: { id: createOpcionDto.preguntaId },
  });

  if (!pregunta) {
    throw new NotFoundException('Pregunta no encontrada');
  }

  // Validación: solo se pueden agregar opciones a preguntas con opcion simple u opcion multiple
  const tiposPermitidos = [
    TipoRespuesta.OPCION_SIMPLE,
    TipoRespuesta.OPCION_MULTIPLE,
  ];

  if (!tiposPermitidos.includes(pregunta.tipo)) {
    throw new BadRequestException(
      `No se pueden agregar opciones a una pregunta de tipo ${pregunta.tipo}`,
    );
  }

  const newOpcionRespuesta = this.opcionRepository.create({
    texto: createOpcionDto.texto,
    numero: createOpcionDto.numero,
    pregunta: pregunta,
  });

  return this.opcionRepository.save(newOpcionRespuesta);
}

  async update(id: number, updateOpcioneDto: UpdateOpcioneDto): Promise<Opcion> {
  const opcion = await this.opcionRepository.findOne({
    where: { id },
    relations: ['pregunta'],
  });

  if (!opcion) {
    throw new NotFoundException('Opción no encontrada');
  }

  const respuestasUsadas = await this.respuestaOpcionRepository.count({
    where: { opcion: { id } },
  });

  if (respuestasUsadas > 0) {
    throw new BadRequestException(
      'No se puede modificar la opción porque ya fue usada en respuestas.'
    );
  }

  Object.assign(opcion, updateOpcioneDto);

  return this.opcionRepository.save(opcion);
}


  // Eliminar una opcion de respuesta de una pregunta con tipo respuesta con opcion simple o respuesta con opcion multiple
  async remove(id: number): Promise<void> {
    const opcion = await this.opcionRepository.findOne({ where: { id } });

    if (!opcion) {
      throw new NotFoundException('Opción no encontrada');
    }

    const respuestasUsadas = await this.respuestaOpcionRepository.count({
      where: { opcion: { id } },
    });

    if (respuestasUsadas > 0) {
      throw new BadRequestException(
        'No se puede eliminar la opción porque ya fue usada en respuestas.'
      );
    }

    await this.opcionRepository.remove(opcion);
  }
 
}
