import { Module } from '@nestjs/common';
import { RespuestasAbiertasService } from './respuestas-abiertas.service';
import { RespuestasAbiertasController } from './respuestas-abiertas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
@Module({
  imports: [TypeOrmModule.forFeature([
    RespuestaAbierta,
     Pregunta,
     Respuesta,
  ])],
  controllers: [RespuestasAbiertasController],
  providers: [ RespuestasAbiertasService],
  exports: [RespuestasAbiertasService],

})
export class RespuestasAbiertasModule {}
