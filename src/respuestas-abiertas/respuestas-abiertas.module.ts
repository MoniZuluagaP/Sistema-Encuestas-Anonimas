import { Module } from '@nestjs/common';
import { RespuestasAbiertasService } from './respuestas-abiertas.service';
import { RespuestasAbiertasController } from './respuestas-abiertas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta, RespuestaAbierta, Pregunta])],
  controllers: [RespuestasAbiertasController],
  providers: [RespuestasAbiertasService],
})
export class RespuestasAbiertasModule {}
