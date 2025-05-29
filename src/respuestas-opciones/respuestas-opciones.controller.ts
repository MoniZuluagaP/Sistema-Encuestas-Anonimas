import { Controller, Post, Body } from '@nestjs/common';
import { RespuestasOpcionesService } from './respuestas-opciones.service';
import { CreateRespuestaOpcionDto } from './dto/create-respuestas-opciones.dto';

@Controller('respuestas-opciones')
export class RespuestasOpcionesController {
  constructor(private readonly respuestasOpcionesService: RespuestasOpcionesService) {}

  @Post()
  create(@Body() dto: CreateRespuestaOpcionDto) {
    return this.respuestasOpcionesService.create(dto);
  }

}