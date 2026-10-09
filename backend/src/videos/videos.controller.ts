import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los videos' })
  @ApiResponse({ status: 200, description: 'Lista de videos (puede estar vacía)', type: [Video] })
  findAll(): Video[] {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un video por id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'El video encontrado', type: Video })
  @ApiBadRequestResponse({ description: 'El id no es un UUID válido' })
  @ApiNotFoundResponse({ description: 'No existe un video con ese id' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Video {
    return this.videosService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un video' })
  @ApiResponse({ status: 201, description: 'Video creado', type: Video })
  @ApiBadRequestResponse({ description: 'Datos inválidos, faltantes o propiedades desconocidas' })
  @ApiConflictResponse({ description: 'Ya existe un video con ese título' })
  create(@Body() dto: CreateVideoDto): Video {
    return this.videosService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un video' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Video actualizado', type: Video })
  @ApiBadRequestResponse({ description: 'Id o datos inválidos / propiedades desconocidas' })
  @ApiNotFoundResponse({ description: 'No existe un video con ese id' })
  @ApiConflictResponse({ description: 'El nuevo título ya lo usa otro video' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateVideoDto): Video {
    return this.videosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un video' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Video eliminado (sin cuerpo)' })
  @ApiBadRequestResponse({ description: 'El id no es un UUID válido' })
  @ApiNotFoundResponse({ description: 'No existe un video con ese id' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.videosService.remove(id);
  }
}
