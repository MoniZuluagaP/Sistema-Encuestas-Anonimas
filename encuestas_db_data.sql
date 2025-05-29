INSERT INTO "public"."encuesta" ("id", "nombre", "fecha_vencimiento", "email", "codigo_respuesta", "codigo_resultados") VALUES
(1, 'Satisfacción del Servicio al Cliente', '2025-07-01 00:00:00', 'cliente1@mail.com', 'e49eb8c9-78d5-4314-b7d4-c72d194bc27f', '1165ea20-cd06-4ddf-a678-3658976e3fc9');

INSERT INTO "public"."pregunta" ("id", "numero", "texto", "tipo", "encuestaId") VALUES
(1, 1, '¿Cómo calificarías nuestro servicio?', 'OPCION_MULTIPLE_SELECCION_SIMPLE', 1),
(2, 2, '¿Qué sugerencias tienes para mejorar?', 'ABIERTA', 1);

INSERT INTO "public"."opcion" ("id", "texto", "numero", "preguntaId") VALUES
(1, 'Excelente', 1, 1),
(2, 'Bueno', 2, 1),
(3, 'Regular', 3, 1),
(4, 'Malo', 4, 1);

INSERT INTO "public"."respuesta" ("id", "encuestaId") VALUES
(1, 1);

INSERT INTO "public"."respuesta_abierta" ("id", "texto", "preguntaId", "respuestaId") VALUES
(1, 'Más personal para atención al cliente.', 2, 1);

INSERT INTO "public"."respuesta_opcion" ("id", "respuestaId", "opcionId") VALUES
(1, 1, 3);


