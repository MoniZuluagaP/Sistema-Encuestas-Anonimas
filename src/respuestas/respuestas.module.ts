import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Respuesta } from './entities/respuesta.entity';

import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionesService } from 'src/respuestas-opciones/respuestas-opciones.service';

import { RespuestasAbiertasModule } from 'src/respuestas-abiertas/respuestas-abiertas.module';
import { RespuestasOpcionesModule } from 'src/respuestas-opciones/respuestas-opciones.module'; // 👈


import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';






@Module({
  imports:[TypeOrmModule.forFeature([
    Respuesta,
    Encuesta,    
     RespuestaAbierta, 
     RespuestaOpcion,
    Pregunta,
    Opcion,
    
   
    
  ]),

  RespuestasAbiertasModule, 
  RespuestasOpcionesModule, 
  ],
  controllers: [RespuestasController],
  providers: [
    RespuestasService,
    RespuestasAbiertasService,
    RespuestasOpcionesService
  ],
  exports: [RespuestasService]

  
})
export class RespuestasModule {}
