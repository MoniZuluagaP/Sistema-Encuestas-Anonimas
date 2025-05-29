INSERT INTO "public"."encuesta" ("id", "nombre", "fecha_vencimiento", "email", "codigo_respuesta", "codigo_resultados") VALUES
(8, 'Satisfacción del Servicio al Cliente', '2025-07-01 00:00:00', 'cliente1@mail.com', '7e0a33d1-379c-4852-93c5-22b18f6284d6', '3b7763f2-3449-4fa3-87c5-7a74795a4b7f');

INSERT INTO "public"."pregunta" ("id", "numero", "texto", "tipo", "encuestaId") VALUES
(10, 1, '¿Cómo calificarías nuestro servicio?', 'OPCION_MULTIPLE_SELECCION_SIMPLE', 8),
(11, 2, '¿Qué sugerencias tienes para mejorar?', 'ABIERTA', 8);

INSERT INTO "public"."opcion" ("id", "texto", "numero", "preguntaId") VALUES
(4, 'Excelente', 1, 10),
(5, 'Bueno', 2, 10),
(6, 'Regular', 3, 10),
(7, 'Malo', 4, 10);

INSERT INTO "public"."respuesta" ("id", "encuestaId") VALUES
(2, 8);

INSERT INTO "public"."respuesta_abierta" ("id", "texto", "preguntaId", "respuestaId") VALUES
(4, 'Más personal para atención al cliente.', 11, 2);

INSERT INTO "public"."respuesta_opcion" ("id", "respuestaId", "opcionId") VALUES
(1, 2, 5);


