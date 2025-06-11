import { Module } from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { OpcionesController } from './opciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';
import { RespuestasOpcionSimpleModule } from 'src/respuestas-opcion-simple/respuesta-opcion-simple.module';
import { RespuestaOpcionSimple } from 'src/respuestas-opcion-simple/entities/respuesta-opcion-simple.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Opcion, Pregunta, RespuestaOpcionSimple]),
    RespuestasOpcionSimpleModule,
  ],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService],
})
export class OpcionesModule {}
