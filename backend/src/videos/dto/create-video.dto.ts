import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export const ESTADOS = ['borrador', 'publicado'] as const;

// Quita espacios al inicio/final antes de validar (solo si es string)
const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateVideoDto {
  @ApiProperty({ example: 'Sobreviviendo la noche 5 en FNAF', minLength: 3, maxLength: 80 })
  @Transform(trim)
  @IsString({ message: 'titulo debe ser texto' })
  @Length(3, 80, { message: 'titulo debe tener entre 3 y 80 caracteres' })
  titulo: string;

  @ApiProperty({ example: 'Roblox', minLength: 2, maxLength: 50 })
  @Transform(trim)
  @IsString({ message: 'juego debe ser texto' })
  @Length(2, 50, { message: 'juego debe tener entre 2 y 50 caracteres' })
  juego: string;

  @ApiProperty({ example: 754, description: 'Duración en segundos (1 a 43200)', minimum: 1, maximum: 43200 })
  @IsInt({ message: 'duracionSegundos debe ser un entero' })
  @Min(1, { message: 'duracionSegundos debe ser al menos 1' })
  @Max(43200, { message: 'duracionSegundos no puede pasar de 43200 (12 horas)' })
  duracionSegundos: number;

  @ApiPropertyOptional({ enum: ESTADOS, default: 'borrador' })
  @IsOptional()
  @IsIn(ESTADOS, { message: 'estado debe ser "borrador" o "publicado"' })
  estado?: (typeof ESTADOS)[number];

  @ApiPropertyOptional({ type: [String], example: ['terror', 'gameplay'], maxItems: 5 })
  @IsOptional()
  @IsArray({ message: 'etiquetas debe ser un arreglo' })
  @ArrayMaxSize(5, { message: 'etiquetas admite máximo 5 elementos' })
  @IsString({ each: true, message: 'cada etiqueta debe ser texto' })
  @Length(2, 20, { each: true, message: 'cada etiqueta debe tener entre 2 y 20 caracteres' })
  etiquetas?: string[];
}
