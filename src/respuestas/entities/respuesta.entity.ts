import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcionSimple } from 'src/respuestas-opcion-simple/entities/respuesta-opcion-simple.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.id)
  encuesta: Encuesta;

  @OneToMany(() => RespuestaAbierta, (ra) => ra.respuesta)
  abiertas: RespuestaAbierta[];

  @OneToMany(() => RespuestaOpcionSimple, (ro) => ro.respuesta)
  opciones: RespuestaOpcionSimple[];
}
