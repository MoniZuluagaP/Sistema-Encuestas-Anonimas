import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { UpdateOpcioneDto } from './dto/update-opcione.dto';
import { Pregunta, TipoRespuesta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OpcionesService {
  constructor(
    @InjectRepository(Opcion)
    private readonly opcionRepo: Repository<Opcion>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
  ) {}
  

  //Si la pregunta es de tipo de respusta con opciones, busca la pregunta y sus opciones de respuesta para poderlo utilizar en el encuestas.service
    async findOpcionesByPregunta(preguntaId: number): Promise<Opcion[]> {
    const pregunta = await this.preguntaRepo.findOne({ where: { id: preguntaId } });

    if (!pregunta) {
      throw new NotFoundException('Pregunta no encontrada');
    }

    const esTipoConOpciones =
      pregunta.tipo === TipoRespuesta.OPCION_SIMPLE ||
      pregunta.tipo === TipoRespuesta.OPCION_MULTIPLE;

    if (!esTipoConOpciones) {
      return [];
    }

    return this.opcionRepo.find({
      where: { pregunta: { id: preguntaId } }
    });
  }
  

  //Crear opcion de respuesta de una pregunta con tipo respuesta con opcion simple o respuesta con opcion multiple
  async createOpcion(createOpcionDto: CreateOpcionDto): Promise<Opcion> {
  const pregunta = await this.preguntaRepo.findOne({
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

  const newOpcionRespuesta = this.opcionRepo.create({
    texto: createOpcionDto.texto,
    numero: createOpcionDto.numero,
    pregunta: pregunta,
  });

  return this.opcionRepo.save(newOpcionRespuesta);
}


  /* update(id: number, updateOpcioneDto: UpdateOpcioneDto) {
    return `This action updates a #${id} opcione`;
  } */

    
/*   remove(id: number) {
    return `This action removes a #${id} opcione`;
  } */
}
