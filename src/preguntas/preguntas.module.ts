import { Module } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { PreguntasController } from './preguntas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { OpcionesModule } from 'src/opciones/opciones.module';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta, Encuesta,RespuestaAbierta,
      RespuestaOpcion]), OpcionesModule],
  controllers: [PreguntasController],
  providers: [PreguntasService],
  exports: [PreguntasService]
})
export class PreguntasModule {}
