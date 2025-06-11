import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestasOpcionMultipleService } from './respuesta-opcion-multiple.service';
import { RespuestasOpcionMultipleController } from './respuesta-opcion-multiple.controller';
import { RespuestaOpcionMultiple } from './entities/respuesta-opcion-multiple.entity';
import { Respuesta } from '../respuestas/entities/respuesta.entity';
import { Opcion } from '../opciones/entities/opciones.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RespuestaOpcionMultiple, Opcion, Respuesta]),
  ],
  controllers: [RespuestasOpcionMultipleController],
  providers: [RespuestasOpcionMultipleService],
  exports: [RespuestasOpcionMultipleService],
})
export class RespuestasOpcionMultipleModule {}
