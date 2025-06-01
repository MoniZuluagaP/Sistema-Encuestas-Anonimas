export declare class RespuestaAbiertaDto {
    preguntaId: number;
    texto: string;
}
export declare class RespuestaOpcionDto {
    preguntaId: number;
    opcionId: number;
}
export declare class CreateRespuestaDto {
    codigoEncuesta: string;
    abiertas?: RespuestaAbiertaDto[];
    opciones?: RespuestaOpcionDto[];
}
