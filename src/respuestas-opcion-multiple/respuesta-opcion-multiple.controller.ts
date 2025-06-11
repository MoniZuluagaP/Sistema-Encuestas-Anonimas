import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RespuestasOpcionMultipleService } from './respuesta-opcion-multiple.service';
import { CreateRespuestaOpcionMultipleDto } from './dto/create-respuestas-opcion-multiple.dto';

@Controller('respuestas-opcion-multiple')
export class RespuestasOpcionMultipleController {
  constructor(
    private readonly respuestaOpcionMultipleService: RespuestasOpcionMultipleService
  ) {}

  @Post()
  create(@Body() dto: CreateRespuestaOpcionMultipleDto) {
    return this.respuestaOpcionMultipleService.create(dto);
  }

  @Get('/:respuestaId/:preguntaId')
  findRespuestasAbiertasByRespuestaIdYPreguntaId(
    @Param('respuestaId') respuestaId: number,
    @Param('preguntaId') preguntaId: number,
  ) {
    return this.respuestaOpcionMultipleService.findRespuestasAbiertasByRespuestaIdYPreguntaId(
      respuestaId,
      preguntaId,
    );
  }
}
