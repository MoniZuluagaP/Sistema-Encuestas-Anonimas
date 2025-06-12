
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

import { RespuestaOpcionSimple } from 'src/respuestas-opcion-simple/entities/respuesta-opcion-simple.entity';
import { RespuestasOpcionSimpleService } from 'src/respuestas-opcion-simple/respuesta-opcion-simple.service';

import { EmailModule } from '../email/email.module'; 
import { RespuestaOpcionMultiple } from 'src/respuestas-opcion-multiple/entities/respuesta-opcion-multiple.entity';
import { RespuestasOpcionMultipleService } from 'src/respuestas-opcion-multiple/respuesta-opcion-multiple.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encuesta,
      Pregunta,
      Opcion,
      Respuesta,
      RespuestaAbierta,
      RespuestaOpcionSimple,
      RespuestaOpcionMultiple,
    ]),
      EmailModule,
  ],
  controllers: [EncuestasController],
  providers: [
    EncuestasService,
    PreguntasService,
    OpcionesService,
    RespuestasService,
    RespuestasAbiertasService,
    RespuestasOpcionSimpleService,
    RespuestasOpcionMultipleService,
  ],
})
export class EncuestasModule {}
