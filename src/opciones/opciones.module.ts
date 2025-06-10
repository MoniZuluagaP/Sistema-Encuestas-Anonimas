import { Module } from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { OpcionesController } from './opciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';
import { RespuestasOpcionesModule } from 'src/respuestas-opciones/respuestas-opciones.module';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Opcion, Pregunta,RespuestaOpcion])
, RespuestasOpcionesModule],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService]
})
export class OpcionesModule {}
