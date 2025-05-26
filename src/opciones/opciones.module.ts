import { Module } from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { OpcionesController } from './opciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Opcion } from './entities/opciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opcion, Pregunta])],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService]
})
export class OpcionesModule {}
