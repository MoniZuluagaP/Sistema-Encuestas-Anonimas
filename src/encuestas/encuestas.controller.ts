/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncuestasService } from './encuestas.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';

@Controller('encuesta')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  //Para la pagina de creacion de la encuesta
  @Get()
  startEncuesta(): string {
    return 'ACA DEBE IRSE ARMANDO LA ENCUESTA, ESTAN LOS CAMPOS PARA COMPLETAR Y CREAR LA ENCUESTA Y EL BOTON PARA HACER';
  }

  //Ruta cuando se hace post de una nueva encuesta
  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestasService.create(createEncuestaDto);
  }

  //Ruta para buscar una encuesta
  @Get(':codigo') 
  findByCodigo(@Param('codigo') codigo: string): Promise<Encuesta> {
    return this.encuestasService.findByCodigo(codigo);
  }


  //Los metodos siguientes los implementamos una vez tengamos todo lo demas listo para hacerlos como funcionalidades extra 

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateEncuestaDto: UpdateEncuestaDto) {
    return this.encuestasService.update(+id, updateEncuestaDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encuestasService.remove(+id);
  } */
}
