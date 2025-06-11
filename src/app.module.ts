import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncuestasModule } from './encuestas/encuestas.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { OpcionesModule } from './opciones/opciones.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { typeOrmConfig } from './config/typeorm.config';
import { RespuestasAbiertasModule } from './respuestas-abiertas/respuestas-abiertas.module';
import { RespuestasOpcionSimpleModule } from './respuestas-opcion-simple/respuesta-opcion-simple.module';
import { EmailModule } from './email/email.module';
import { RespuestasOpcionMultipleModule } from './respuestas-opcion-multiple/respuesta-opcion-multiple.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    EncuestasModule,
    PreguntasModule,
    OpcionesModule,
    RespuestasModule,
    EmailModule,
    RespuestasAbiertasModule,
    RespuestasOpcionSimpleModule,
    RespuestasOpcionMultipleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
