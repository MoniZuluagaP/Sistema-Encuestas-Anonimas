import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Pregunta } from "src/preguntas/entities/pregunta.entity";
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';

@Entity()
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

  //@ManyToOne(() => Pregunta, (pregunta) => pregunta.id, { onDelete: 'CASCADE' })
  //pregunta: Pregunta;

  @ManyToOne(() => Pregunta, pregunta => pregunta.opciones, { onDelete: 'CASCADE' })
  pregunta: Pregunta;

  @OneToMany(() => RespuestaOpcion, ro => ro.opcion)
  respuestasOpcion: RespuestaOpcion[];

}
