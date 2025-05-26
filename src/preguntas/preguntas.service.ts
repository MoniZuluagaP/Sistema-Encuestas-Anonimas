import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Repository } from 'typeorm';
import { Pregunta, TipoRespuesta } from './entities/pregunta.entity';
import { OpcionesService } from 'src/opciones/opciones.service';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,

    private readonly opcionesService: OpcionesService,

    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,
  ) {}
  
  //Crear una pregunta y asignarla a la encuesta segun el Id 
  async create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
  
    const encuesta = await this.encuestaRepo.findOneBy({ id: createPreguntaDto.encuestaId });

    if (!encuesta) {
      throw new NotFoundException(
        `Encuesta con ID ${createPreguntaDto.encuestaId} no encontrada`,
      );
    }

    const nuevaPregunta = this.preguntaRepo.create({
      numero: createPreguntaDto.numero,
      texto: createPreguntaDto.texto,
      tipo: createPreguntaDto.tipo,
      encuesta,
    });

    return this.preguntaRepo.save(nuevaPregunta);
}

  /* async obtenerPreguntasPorEncuesta(encuestaId: number): Promise<Pregunta[]> {
    return this.preguntaRepo.find({
      where: { encuesta: { id: encuestaId } },
      //relations: ['opciones'], // Incluye opciones si aplica
    });
  } */

  async obtenerPreguntasPorEncuesta(encuestaId: number): Promise<any[]> {
    const preguntas = await this.preguntaRepo.find({
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

  update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    return `This action updates a #${id} pregunta`;
  }

  remove(id: number) {
    return `This action removes a #${id} pregunta`;
  }
}
