import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestasService } from './encuestas.service';
import { EncuestasController } from './encuestas.controller';
import { Encuesta } from './entities/encuesta.entity';
import { PreguntasModule } from 'src/preguntas/preguntas.module';
import { OpcionesModule } from 'src/opciones/opciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Encuesta]), PreguntasModule, OpcionesModule ],
  controllers: [EncuestasController],
  providers: [EncuestasService],
})
export class EncuestasModule {}
