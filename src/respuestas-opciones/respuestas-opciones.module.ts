import { Module } from '@nestjs/common';
import { RespuestasOpcionesService } from './respuestas-opciones.service';
import { RespuestasOpcionesController } from './respuestas-opciones.controller';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaOpcion } from './entities/respuesta-opciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
  RespuestaOpcion,
  Opcion,
  Respuesta,
])],
  controllers: [RespuestasOpcionesController],
  providers: [RespuestasOpcionesService],
  exports: [RespuestasOpcionesService],
})
export class RespuestasOpcionesModule {}
