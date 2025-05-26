import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pregunta } from "src/preguntas/entities/pregunta.entity";
import { Respuesta } from "src/respuestas/entities/respuesta.entity";

@Entity()
export class Encuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'uuid', unique: true })
  codigo_respuesta: string;

  @Column({ type: 'uuid', unique: true })
  codigo_resultados: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_vencimiento: Date | null;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta)
  preguntas: Pregunta[];

  @OneToMany(() => Respuesta, respuesta => respuesta.encuesta)
  respuestas: Respuesta[];

}




  

