import { Opcion } from 'src/opciones/entities/opciones.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;
   

  

  //@ManyToOne(() => Opcion, (opcion) => opcion.id)
  //opcion: Opcion;

  //@ManyToOne(() => Respuesta, (respuesta) => respuesta.opciones)  
  //respuesta: Respuesta;
  

  @ManyToOne(() => Respuesta, respuesta => respuesta.opciones, { onDelete: 'CASCADE' })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, opcion => opcion.id, { onDelete: 'CASCADE' })
  opcion: Opcion;

  }