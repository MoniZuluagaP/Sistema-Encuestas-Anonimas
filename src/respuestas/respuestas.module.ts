import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Respuesta } from './entities/respuesta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Respuesta,Encuesta])],
  controllers: [RespuestasController],
  providers: [RespuestasService],
  exports: [RespuestasService]
})
export class RespuestasModule {}
