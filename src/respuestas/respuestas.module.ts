import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Respuesta } from './entities/respuesta.entity';

import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcionSimple } from 'src/respuestas-opcion-simple/entities/respuesta-opcion-simple.entity';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionSimpleService } from 'src/respuestas-opcion-simple/respuesta-opcion-simple.service';

import { RespuestasAbiertasModule } from 'src/respuestas-abiertas/respuestas-abiertas.module';
import { RespuestasOpcionSimpleModule } from 'src/respuestas-opcion-simple/respuesta-opcion-simple.module'; // 👈

import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Respuesta,
      Encuesta,
      RespuestaAbierta,
      RespuestaOpcionSimple,
      Pregunta,
      Opcion,
    ]),

    RespuestasAbiertasModule,
    RespuestasOpcionSimpleModule,
  ],
  controllers: [RespuestasController],
  providers: [
    RespuestasService,
    RespuestasAbiertasService,
    RespuestasOpcionSimpleService,
  ],
  exports: [RespuestasService],
})
export class RespuestasModule {}
