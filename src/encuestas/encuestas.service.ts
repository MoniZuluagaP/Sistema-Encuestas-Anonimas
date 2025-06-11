import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto'; 
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { OpcionesService } from 'src/opciones/opciones.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
import { RespuestasAbiertasService } from 'src/respuestas-abiertas/respuestas-abiertas.service';
import { RespuestasOpcionSimpleService } from 'src/respuestas-opcion-simple/respuesta-opcion-simple.service';
import { Pregunta, TipoRespuesta } from 'src/preguntas/entities/pregunta.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
import { RespuestaAbierta } from 'src/respuestas-abiertas/entities/respuesta-abierta.entity';
import { RespuestaOpcionSimple } from 'src/respuestas-opcion-simple/entities/respuesta-opcion-simple.entity';
import { Opcion } from 'src/opciones/entities/opciones.entity';
import * as puppeteer from 'puppeteer';
export interface ResumenPregunta {
  pregunta: string;
  tipo: any;
  conteoOpciones: Record<string, number>;
  respuestasAbiertas?: string[];
}

export interface ResumenEstadistico {
  encuesta: string;
  fechaGeneracion: string;
  resumen: ResumenPregunta[];
}


export class EncuestasService {
  
  constructor(
    @InjectRepository(Encuesta)
    private encuestaRepo: Repository<Encuesta>,
    @InjectRepository(Respuesta)  
    private readonly respuestaRepository: Repository<Respuesta>,
    private readonly preguntasService: PreguntasService,
    private readonly opcionService: OpcionesService,
    private readonly respuestasService: RespuestasService,
    private readonly respuestasAbiertasService: RespuestasAbiertasService,
    private readonly respuestasOpcionesService: RespuestasOpcionSimpleService,
  ) {}

  create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta> {
    const nuevaEncuesta = this.encuestaRepo.create({
      ...createEncuestaDto,
      codigo_respuesta: uuidv4(),
      codigo_resultados: uuidv4(),
    });
   

    return this.encuestaRepo.save(nuevaEncuesta);
  }


async findByCodigo(codigo: string): Promise<Encuesta> {
  const encuesta = await this.encuestaRepo.findOne({
    where: [
      { codigo_respuesta: codigo },
      { codigo_resultados: codigo },
    ],
  });

  if (!encuesta) {
    throw new NotFoundException("Encuesta no encontrada");
  }

  const esCodigoRespuesta = codigo === encuesta.codigo_respuesta;
  const esCodigoAdmin = codigo === encuesta.codigo_resultados;

  if (!encuesta.activa && esCodigoRespuesta) {
    throw new BadRequestException("Encuesta deshabilitada");
  }

  if (encuesta.fecha_vencimiento) {
    const ahora = new Date();
    const vencimiento = new Date(encuesta.fecha_vencimiento);
    if (vencimiento < ahora && esCodigoRespuesta) {
      throw new BadRequestException("Encuesta vencida");
    }
  }

  const mostrarRespuestas = esCodigoAdmin;
  const preguntas: Pregunta[] = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

  let respuestasAbiertas: RespuestaAbierta[] = [];
  let respuestasOpciones: RespuestaOpcionSimple[] = [];

  if (mostrarRespuestas) {
    const respuestas: Respuesta[] = await this.respuestasService.findAllByEncuestaId(encuesta.id);
    const respuestaIds = respuestas.map(r => r.id);

    respuestasAbiertas = await this.respuestasAbiertasService.findRespuestasAbiertasByRespuestaIds(respuestaIds);
    respuestasOpciones = await this.respuestasOpcionesService.findByRespuestaIds(respuestaIds);
  }

  const preguntasConOpcionesYRespuestas = await Promise.all(
    preguntas.map(async (pregunta: Pregunta) => {
      let opciones: Opcion[] = [];

      if (pregunta.tipo !== TipoRespuesta.ABIERTA) {
        opciones = await this.opcionService.findOpcionesByPregunta(pregunta.id);
      }

      const respuestas = mostrarRespuestas
        ? pregunta.tipo === TipoRespuesta.ABIERTA
          ? respuestasAbiertas.filter(r => r.pregunta.id === pregunta.id)
          : respuestasOpciones
              .filter(ro => ro.opcion.pregunta.id === pregunta.id)
              .map(ro => ro.opcion)
        : [];

      return {
        ...pregunta,
        opciones,
        respuestas,
      };
    }),
  );

  return {
    ...encuesta,
    preguntas: preguntasConOpcionesYRespuestas,
  };
}


  // Habilitar o deshabilitar una encuesta
  async actualizarEstado(codigo: string, activa: boolean): Promise<Encuesta> {
    const encuesta = await this.encuestaRepo.findOne({
      where: { codigo_resultados: codigo },
    });

    if (!encuesta) {
      throw new NotFoundException("Encuesta no encontrada");
    }

    encuesta.activa = activa;
    return this.encuestaRepo.save(encuesta);
  }


  // Establecer o actualizar fecha de vencimiento
  async actualizarFechaVencimiento(codigo: string, fecha: Date): Promise<Encuesta> {
      const encuesta = await this.encuestaRepo.findOne({
        where: { codigo_resultados: codigo },
      });

      if (!encuesta) {
        throw new NotFoundException("Encuesta no encontrada");
      }

      encuesta.fecha_vencimiento = fecha;
      return this.encuestaRepo.save(encuesta);
  }


  async update(id: number, updateDto: UpdateEncuestaDto): Promise<any> {
  const encuesta = await this.encuestaRepo.findOne({ where: { id } });
  if (!encuesta) {
    throw new NotFoundException(`Encuesta con ID ${id} no encontrada.`);
  }

  const cantidadRespuestas = await this.respuestaRepository.count({
    where: { encuesta: { id } },
  });

  if (cantidadRespuestas > 0) {
    throw new BadRequestException('La encuesta no puede modificarse porque ya tiene respuestas.');
  }

  const encuestaActualizada = Object.assign(encuesta, updateDto);

  await this.encuestaRepo.save(encuestaActualizada);

  return {
    message: 'Encuesta actualizada exitosamente.',
    data: encuestaActualizada,
  };
}


async remove(id: number): Promise<boolean> {
    // 1) Verifico que exista
    const encuesta = await this.encuestaRepo.findOne({ where: { id } });
    if (!encuesta) {
      throw new NotFoundException(`Encuesta con id ${id} no encontrada`);
    }

    // 2) Verifico si hay respuestas asociadas
    const respuestasArray = await this.respuestasService.findAllByEncuestaId(id);
  if (respuestasArray.length > 0) {
    throw new BadRequestException(
      `No se puede eliminar la encuesta ${id} porque ya tiene respuestas`
    );
  }
    // 3) Si no hay respuestas, borro la encuesta
    const result = await this.encuestaRepo.delete(id);
    return (result.affected ?? 0) > 0;
   }


   //NUEVA FUNCIÓN genera PDF
  async generarPDFPorCodigoResultados(codigo: string): Promise<Buffer> {
    const encuesta = await this.encuestaRepo.findOne({
      where: { codigo_resultados: codigo },
      relations: ['preguntas'],
    });

    if (!encuesta) throw new NotFoundException('Encuesta no encontrada');

    const preguntas = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

    // Obtener cantidad de encuestados
    const respuestas = await this.respuestasService.findAllByEncuestaId(encuesta.id);
    const cantidadEncuestados = respuestas.length;

    const bodyHtml = await Promise.all(
      preguntas.map(async (pregunta, index) => {
        const opcionesTodas = await this.opcionService.findOpcionesByPregunta(pregunta.id);
        const opcionesSeleccionadas = await this.respuestasOpcionesService.obtenerOpcionesPorPregunta(pregunta.id);
        const respuestasAbiertas = await this.respuestasAbiertasService.obtenerAbiertasPorPregunta(pregunta.id);

        const opcionesHtml = opcionesTodas.length > 0 ? opcionesTodas.map(opcion => {
          const seleccionada = opcionesSeleccionadas.some(ro => ro.opcion.id === opcion.id);
          return `<li>${opcion.texto} ${seleccionada ? '<strong>(seleccionada)</strong>' : ''}</li>`;
        }).join('') : '';

        let respuestasHtml = '';

        if (opcionesSeleccionadas.length > 0) {
          respuestasHtml += opcionesSeleccionadas
            .map(ro => `<div class="respuesta">• ${ro.opcion.texto}</div>`)
            .join('');
        }

        if (pregunta.tipo === TipoRespuesta.ABIERTA && respuestasAbiertas.length > 0) {
          respuestasHtml += respuestasAbiertas
            .map(r => `<div class="respuesta">• ${r.texto}</div>`)
            .join('');
        }

        if (respuestasHtml === '') {
          respuestasHtml = '<div class="respuesta">Sin respuestas</div>';
        }

        return `
          <div class="bloque-pregunta">
            <h3>${index + 1}. ${pregunta.texto}</h3>
            ${opcionesHtml ? `<strong>Opciones:</strong><ul>${opcionesHtml}</ul>` : ''}
            <strong>Respuestas:</strong>
            ${respuestasHtml}
          </div>
        `;
      })
    );

    const html = `
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            color: #000; 
            background-color: #fff;
          }
          h1 { color: #000; }
          .bloque-pregunta { margin-bottom: 25px; }
          h3 { margin-bottom: 8px; }
          ul { margin-top: 4px; margin-bottom: 10px; padding-left: 20px; }
          li { margin-bottom: 4px; }
          .respuesta { padding-left: 15px; margin-bottom: 3px; color: #000; }
          strong { color: #000; }
          .footer { margin-top: 40px; font-size: 12px; color: #555; }
          hr { border-color: #000; }
        </style>
      </head>
      <body>
        <h1>Resultados: ${encuesta.nombre}</h1>
        <p><strong>Cantidad de encuestados:</strong> ${cantidadEncuestados}</p>
        <p><strong>Exportado el:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        ${bodyHtml.join('')}
        <div class="footer">Sistema de Encuestas Anónimas - ${new Date().getFullYear()}</div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    await browser.close();

    return Buffer.from(buffer);
  }

  
  //FUNCION ADICIONAL RESUMEN ESTADISTICO
  async generarResumenEstadistico(codigoResultados: string) {
    const encuesta = await this.encuestaRepo.findOne({
      where: { codigo_resultados: codigoResultados },
      relations: ['preguntas'],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    const preguntas = await this.preguntasService.obtenerPreguntasPorEncuesta(encuesta.id);

    // Obtener cantidad de encuestados
    const respuestas = await this.respuestasService.findAllByEncuestaId(encuesta.id);
    const cantidadEncuestados = respuestas.length;

    const resumen: ResumenPregunta[] = [];

    for (const pregunta of preguntas) {
      const opcionesSeleccionadas = await this.respuestasOpcionesService.obtenerOpcionesPorPregunta(pregunta.id);
      const respuestasAbiertas = await this.respuestasAbiertasService.obtenerAbiertasPorPregunta(pregunta.id);

      const conteoOpciones: Record<string, number> = {};

      opcionesSeleccionadas.forEach((respuesta) => {
        const textoOpcion = respuesta.opcion.texto;
        conteoOpciones[textoOpcion] = (conteoOpciones[textoOpcion] || 0) + 1;
      });

      resumen.push({
        pregunta: pregunta.texto,
        tipo: pregunta.tipo,
        conteoOpciones: Object.keys(conteoOpciones).length > 0 ? conteoOpciones : { 'Sin respuestas': 0 },
        respuestasAbiertas: respuestasAbiertas.length > 0 ? respuestasAbiertas.map(r => r.texto) : [],
      });
    }

    return {
      encuesta: encuesta.nombre,
      fechaGeneracion: new Date().toISOString(),
      cantidadEncuestados,
      resumen,
    };
  }

  // Metodo para generar el HTML con graficos
  generarHTMLConGraficos(resumenCompleto: {
    encuesta: string;
    fechaGeneracion: string;
    cantidadEncuestados: number;
    resumen: ResumenPregunta[];
  }): string {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Resumen Estadístico</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
      h3 { margin-top: 40px; }
      ul { margin-top: 8px; padding-left: 20px; }
      li { margin-bottom: 4px; }
    </style>
  </head>
  <body>
    <h1>Resumen Estadístico: ${resumenCompleto.encuesta}</h1>
    <p><strong>Cantidad de encuestados:</strong> ${resumenCompleto.cantidadEncuestados}</p>
    <p>Generado: ${new Date(resumenCompleto.fechaGeneracion).toLocaleString()}</p>

    ${resumenCompleto.resumen
      .map((pregunta, i) => `
        <h3>${pregunta.pregunta}</h3>
        ${
          pregunta.tipo === 'ABIERTA' && pregunta.respuestasAbiertas && pregunta.respuestasAbiertas.length > 0
            ? `<strong>Respuestas abiertas:</strong>
              <ul>
                ${pregunta.respuestasAbiertas ? pregunta.respuestasAbiertas.map(resp => `<li>${resp}</li>`).join('') : ''}
              </ul>`
            : `<canvas id="chart${i}" width="400" height="200"></canvas>
              <script>
                const ctx${i} = document.getElementById('chart${i}').getContext('2d');
                new Chart(ctx${i}, {
                  type: 'bar',
                  data: {
                    labels: ${JSON.stringify(Object.keys(pregunta.conteoOpciones))},
                    datasets: [{
                      label: 'Cantidad',
                      data: ${JSON.stringify(Object.values(pregunta.conteoOpciones))},
                      backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }]
                  },
                  options: {
                    responsive: false,
                    scales: {
                      y: { beginAtZero: true, precision: 0 }
                    }
                  }
                });
              </script>`
        }
      `).join('')}

  </body>
  </html>
    `;
  }

  // Metodo para generar el PDF desde el resumen estadistico
  async generarPDFResumenEstadisticoUnico(codigoResultados: string): Promise<Buffer> {
    const resumenCompleto = await this.generarResumenEstadistico(codigoResultados);

    const html = this.generarHTMLConGraficos(resumenCompleto);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4', printBackground: true }));

    await browser.close();

    return pdfBuffer;
  }
}
