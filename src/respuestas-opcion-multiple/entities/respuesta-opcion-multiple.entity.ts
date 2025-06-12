import { Opcion } from 'src/opciones/entities/opciones.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class RespuestaOpcionMultiple {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preguntaId: number;

  @Column()
  respuestaId: number;

  @Column('int', { array: true })
  opcionIds: number[];

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.opciones, {
    onDelete: 'CASCADE',
  })
  respuesta: Respuesta;
}
