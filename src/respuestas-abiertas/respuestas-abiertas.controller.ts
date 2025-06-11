import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RespuestasAbiertasService } from './respuestas-abiertas.service';
import { CreateRespuestaAbiertaDto } from './dto/create-respuestas-abiertas.dto';

@Controller('respuestas-abiertas')
export class RespuestasAbiertasController {
  constructor(private readonly respuestasAbiertasService: RespuestasAbiertasService) {}

  @Post()
  create(@Body() createDto: CreateRespuestaAbiertaDto) {
    return this.respuestasAbiertasService.create(createDto);
  }

  @Get('/:respuestaId/:preguntaId')
  findRespuestasAbiertasByRespuestaIdYPreguntaId(@Param('respuestaId') respuestaId: number, @Param('preguntaId') preguntaId: number) {
      return this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaIdYPreguntaId(respuestaId, preguntaId);
  }

  @Get('respuesta/:id')
  findRespuestasAbiertasByRespuestaId(@Param('id') encuestaId: string) {
      return this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaId(+encuestaId);
  }

}
