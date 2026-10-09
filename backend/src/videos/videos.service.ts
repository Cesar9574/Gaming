import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  // "Base de datos" en memoria: se reinicia cada vez que se reinicia el servidor
  private readonly videos = new Map<string, Video>();

  constructor() {
    this.sembrar();
  }

  findAll(): Video[] {
    return [...this.videos.values()];
  }

  findOne(id: string): Video {
    const video = this.videos.get(id);
    if (!video) {
      throw new NotFoundException(`No existe un video con id ${id}`);
    }
    return video;
  }

  create(dto: CreateVideoDto): Video {
    this.verificarTituloUnico(dto.titulo);
    const ahora = new Date().toISOString();
    const video: Video = {
      id: randomUUID(),
      titulo: dto.titulo,
      juego: dto.juego,
      duracionSegundos: dto.duracionSegundos,
      estado: dto.estado ?? 'borrador',
      etiquetas: dto.etiquetas ?? [],
      creadoEn: ahora,
      actualizadoEn: ahora,
    };
    this.videos.set(video.id, video);
    return video;
  }

  update(id: string, dto: UpdateVideoDto): Video {
    const actual = this.findOne(id);
    if (dto.titulo !== undefined) {
      this.verificarTituloUnico(dto.titulo, id);
    }
    const actualizado: Video = {
      ...actual,
      ...dto,
      id: actual.id,
      creadoEn: actual.creadoEn,
      actualizadoEn: new Date().toISOString(),
    };
    this.videos.set(id, actualizado);
    return actualizado;
  }

  remove(id: string): void {
    this.findOne(id); // lanza 404 si no existe
    this.videos.delete(id);
  }

  // Dos videos no pueden tener el mismo título (sin importar mayúsculas) -> 409
  private verificarTituloUnico(titulo: string, ignorarId?: string): void {
    const buscado = titulo.toLowerCase();
    for (const v of this.videos.values()) {
      if (v.id !== ignorarId && v.titulo.toLowerCase() === buscado) {
        throw new ConflictException(`Ya existe un video con el título "${v.titulo}"`);
      }
    }
  }

  private sembrar(): void {
    const datos: CreateVideoDto[] = [
      {
        titulo: 'Nivel dos completo en FNAF Establishment',
        juego: 'Roblox',
        duracionSegundos: 540,
        estado: 'publicado',
        etiquetas: ['terror', 'roblox'],
      },
      {
        titulo: 'Reacciono a mis peores sustos',
        juego: 'Varios',
        duracionSegundos: 1260,
        estado: 'borrador',
        etiquetas: ['reaccion'],
      },
    ];
    datos.forEach((d) => this.create(d));
  }
}
