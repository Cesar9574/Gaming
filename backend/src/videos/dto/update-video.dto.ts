import { PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';

// PATCH: todos los campos del create pero opcionales (mantiene las mismas validaciones)
export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
