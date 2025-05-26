import { Pregunta } from 'src/preguntas/entities/pregunta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  //@ManyToOne(() => Pregunta, (pregunta) => pregunta.id) 
  //pregunta: Pregunta;

  @ManyToOne(() => Pregunta, pregunta => pregunta.respuestasAbiertas, { onDelete: 'CASCADE' })
  pregunta: Pregunta;

  @ManyToOne(() => Respuesta, respuesta => respuesta.abiertas, { onDelete: 'CASCADE' })
  respuesta: Respuesta;
}


