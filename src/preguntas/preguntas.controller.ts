import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  //Crea una nueva pregunta
  @Post()
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntasService.create(createPreguntaDto);
  }

  //Mediante el id de la encuesta, trae todas las preguntas que pertenecesn a ella
  @Get('encuesta/:id')
  obtenerPreguntasPorEncuesta(@Param('id') encuestaId: number): Promise<Pregunta[]> {
    return this.preguntasService.obtenerPreguntasPorEncuesta(encuestaId);
  }


/*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntasService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntasService.update(+id, updatePreguntaDto);
  } 

/*   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preguntasService.remove(+id);
  } */
 @Delete(':id')
  async remove(@Param('id') id: number, @Body() body: any) {
    console.log('Eliminando pregunta sin respuestas...');
    console.log('Body recibido:', body);

    await this.preguntasService.remove(id); // Espera a que se elimine
    return { message: 'Pregunta eliminada exitosamente.' }; };
  }

