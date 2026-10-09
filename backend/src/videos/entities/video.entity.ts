import { ApiProperty } from '@nestjs/swagger';

export type EstadoVideo = 'borrador' | 'publicado';

export class Video {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Sobreviviendo la noche 5 en FNAF' })
  titulo: string;

  @ApiProperty({ example: 'Roblox' })
  juego: string;

  @ApiProperty({ example: 754, description: 'Duración en segundos' })
  duracionSegundos: number;

  @ApiProperty({ enum: ['borrador', 'publicado'] })
  estado: EstadoVideo;

  @ApiProperty({ type: [String] })
  etiquetas: string[];

  @ApiProperty({ format: 'date-time' })
  creadoEn: string;

  @ApiProperty({ format: 'date-time' })
  actualizadoEn: string;
}
