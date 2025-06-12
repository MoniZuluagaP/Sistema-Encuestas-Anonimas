import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Pregunta } from "src/preguntas/entities/pregunta.entity";
import { RespuestaOpcionSimple } from 'src/respuestas-opcion-simple/entities/respuesta-opcion-simple.entity';

@Entity()
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

  @ManyToOne(() => Pregunta, pregunta => pregunta.opciones, { onDelete: 'CASCADE' })
  pregunta: Pregunta;

  @OneToMany(() => RespuestaOpcionSimple, ro => ro.opcion)
  respuestasOpcion: RespuestaOpcionSimple[];
}
