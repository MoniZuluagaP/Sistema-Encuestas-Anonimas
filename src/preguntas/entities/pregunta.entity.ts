import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

export enum TipoRespuesta {
  ABIERTA = 'ABIERTA',
  OPCION_SIMPLE = 'OPCION_MULTIPLE_SELECCION_SIMPLE',
  OPCION_MULTIPLE = 'OPCION_MULTIPLE_SELECCION_MULTIPLE',
}

@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  texto: string;

  @Column({ type: 'enum', enum: TipoRespuesta })
  tipo: TipoRespuesta;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas, { onDelete: 'CASCADE' }) 
  encuesta: Encuesta;

  @OneToMany(() => Opcion, opcion => opcion.pregunta)
  opciones: Opcion[];

  @OneToMany(() => RespuestaAbierta, ra => ra.pregunta)
  respuestasAbiertas: RespuestaAbierta[];

  
}
