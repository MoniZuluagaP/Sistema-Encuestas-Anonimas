import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';


@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestaRepo: Repository<Encuesta>,
    private readonly preguntasService: PreguntasService,
    private readonly opcionService: OpcionesService,
  ) {}

  create(createEncuestaDto: CreateEncuestaDto) : Promise<Encuesta> {
    const nuevaEncuesta = this.encuestaRepo.create({
      ...createEncuestaDto,
      codigo_respuesta: uuidv4(),
      codigo_resultados: uuidv4(),
    });
    console.log(nuevaEncuesta)

    return this.encuestaRepo.save(nuevaEncuesta);
  }

  //Buscar en la BD por el codigo UUID. Falta que traiga preguntas y respuestas si el codigo es de visualizacion. Para esto debo inyectar service de preguntas, de opciones, de respuestas
  async findByCodigo(codigo:string) : Promise<Encuesta> {
    const encuesta = await this.encuestaRepo.findOne({
      where: [
        { codigo_respuesta: codigo },
        { codigo_resultados: codigo },
      ],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    const preguntas = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

    return {
      ...encuesta,
      preguntas,
    };
  
  }



  /* update(id: number, updateEncuestaDto: UpdateEncuestaDto) {
    return `This action updates a #${id} encuesta`;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} encuesta`;
  } */

}
