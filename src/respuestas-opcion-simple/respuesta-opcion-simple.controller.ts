import { Controller, Post, Body,Get,Param } from '@nestjs/common';
import { RespuestasOpcionSimpleService } from './respuesta-opcion-simple.service';
import { CreateRespuestaOpcionSimpleDto } from './dto/create-respuestas-opcion-simple.dto';

@Controller('respuestas-opcion-simple')
export class RespuestasOpcionSimpleController {
  constructor(private readonly respuestaOpcionSimpleService: RespuestasOpcionSimpleService) {}

  @Post()
  create(@Body() dto: CreateRespuestaOpcionSimpleDto) {
    return this.respuestaOpcionSimpleService.create(dto);
  }

  @Get('/:respuestaId/:preguntaId')
    findRespuestasAbiertasByRespuestaIdYPreguntaId(@Param('respuestaId') respuestaId: number, @Param('preguntaId') preguntaId: number) {
    return this.respuestaOpcionSimpleService.findRespuestasAbiertasByRespuestaIdYPreguntaId(respuestaId, preguntaId);
  }

  @Get('respuesta/:id')
    findRespuestasOpcionesByRespuestaId(@Param('id') respuestaId: string) {
    return this.respuestaOpcionSimpleService.findByRespuestaId(+respuestaId);
  } 
}