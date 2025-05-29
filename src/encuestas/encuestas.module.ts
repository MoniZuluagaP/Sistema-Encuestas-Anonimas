/* import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestasService } from './encuestas.service';
import { EncuestasController } from './encuestas.controller';
import { Encuesta } from './entities/encuesta.entity';
import { PreguntasModule } from 'src/preguntas/preguntas.module';
import { OpcionesModule } from 'src/opciones/opciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Encuesta]), PreguntasModule, OpcionesModule ],
  controllers: [EncuestasController],
  providers: [EncuestasService],
})
export class EncuestasModule {} */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EncuestasService } from './encuestas.service';
import { EncuestasController } from './encuestas.controller';
import { Encuesta } from './entities/encuesta.entity';

import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { PreguntasService } from 'src/preguntas/preguntas.service';

import { Opcion } from 'src/opciones/entities/opciones.entity';
import { OpcionesService } from 'src/opciones/opciones.service';

import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { RespuestasService } from 'src/respuestas/respuestas.service';

import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';

import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encuesta,
      Pregunta,
      Opcion,
      Respuesta,
      RespuestaAbierta,
      RespuestaOpcion,
    ]),
  ],
  controllers: [EncuestasController],
  providers: [
    EncuestasService,
    PreguntasService,
    OpcionesService,
    RespuestasService,
    RespuestasAbiertasService,
    RespuestasOpcionesService,
  ],
})
export class EncuestasModule {}
