import { Module } from '@nestjs/common';
import { RespuestasOpcionSimpleService } from './respuesta-opcion-simple.service';
import { RespuestasOpcionSimpleController } from './respuesta-opcion-simple.controller';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaOpcionSimple } from './entities/respuesta-opcion-simple.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
  RespuestaOpcionSimple,
  Opcion,
  Respuesta,
])],
  controllers: [RespuestasOpcionSimpleController],
  providers: [RespuestasOpcionSimpleService],
  exports: [RespuestasOpcionSimpleService],
})
export class RespuestasOpcionSimpleModule {}
