import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  // Metodo con el que guardamos todas las respuestas (abiertas o cerradas) de un usuario y se relacionan a una encuesta
  // este metodo se ejecuta primero al dar enviar /guardar respuestas , para despues 
  @Post()
  create(@Body() createRespuestaDto: CreateRespuestaDto) {
    return this.respuestasService.create(createRespuestaDto);
  }


  @Get('/encuesta/:id')
  findByEncuestaId(@Param('id') encuestaId: string) {
    return this.respuestasService.findAllByEncuestaId(+encuestaId);
  }

}
