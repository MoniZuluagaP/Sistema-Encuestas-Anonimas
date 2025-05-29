import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Repository } from 'typeorm';
import { Respuesta } from './entities/respuesta.entity';

@Injectable()
export class RespuestasService {
  
  constructor (
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,

    @InjectRepository(Encuesta)
      private readonly encuestaRepository: Repository<Encuesta>,

  ){}


  async create(createRespuestaDto: CreateRespuestaDto): Promise<Respuesta> {
    const encuesta = await this.encuestaRepository.findOne({
      where: { 
        codigo_resultados: createRespuestaDto.codigoEncuesta },
    });
  

    if ( !encuesta ) {
        throw new NotFoundException ('Encuesta no encontrada');
    }

    const nuevaRespuesta = this.respuestaRepository.create ({
      encuesta,
    })

    return this.respuestaRepository.save (nuevaRespuesta);
  }

  async findByEncuestaId(encuestaId: number): Promise<Respuesta | null> {
    return this.respuestaRepository.findOne({
      where: { encuesta: { id: encuestaId } },
      relations: ['encuesta']
    });
  }

}
