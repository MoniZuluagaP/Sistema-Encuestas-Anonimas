import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RespuestaOpcionMultiple {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preguntaId: number;

  @Column()
  respuestaId: number;

  @Column("int", { array: true })
  opcionIds: number[];
}
