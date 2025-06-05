import { Encuesta } from 'src/encuestas/entities/encuesta.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/respuestas-opciones/entities/respuesta-opciones.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.id)
  encuesta: Encuesta;

  //@ManyToOne(() => Encuesta, encuesta => encuesta.respuestas, { onDelete: 'CASCADE' })
  //encuesta: Encuesta;

  @OneToMany(() => RespuestaAbierta, (ra) => ra.respuesta)
  abiertas: RespuestaAbierta[];

  @OneToMany(() => RespuestaOpcion, (ro) => ro.respuesta)
  opciones: RespuestaOpcion[];

}
