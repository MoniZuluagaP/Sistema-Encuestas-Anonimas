import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { UpdateOpcioneDto } from './dto/update-opcione.dto';

@Controller('opcion')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  //Crear las opciones para una pregunta de tipo con opcion simple o multiple
  @Post()
  create(@Body() createOpcionDto: CreateOpcionDto) {
    return this.opcionesService.createOpcion(createOpcionDto);
  }

  //Traer todas las opciones de una pregunta especifica.
  @Get('/pregunta/:id')
  async findOpcionesByPregunta(@Param('id') preguntaId: number) {
    return this.opcionesService.findOpcionesByPregunta(preguntaId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpcioneDto: UpdateOpcioneDto) {
  return this.opcionesService.update(+id, updateOpcioneDto);
}

   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcionesService.remove(+id);
  } 

}
