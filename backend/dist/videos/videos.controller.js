"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_video_dto_1 = require("./dto/create-video.dto");
const update_video_dto_1 = require("./dto/update-video.dto");
const video_entity_1 = require("./entities/video.entity");
const videos_service_1 = require("./videos.service");
let VideosController = class VideosController {
    constructor(videosService) {
        this.videosService = videosService;
    }
    findAll() {
        return this.videosService.findAll();
    }
    findOne(id) {
        return this.videosService.findOne(id);
    }
    create(dto) {
        return this.videosService.create(dto);
    }
    update(id, dto) {
        return this.videosService.update(id, dto);
    }
    remove(id) {
        this.videosService.remove(id);
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los videos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de videos (puede estar vacía)', type: [video_entity_1.Video] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], VideosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un video por id' }),
    (0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'El video encontrado', type: video_entity_1.Video }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'El id no es un UUID válido' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No existe un video con ese id' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", video_entity_1.Video)
], VideosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un video' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video creado', type: video_entity_1.Video }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos, faltantes o propiedades desconocidas' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Ya existe un video con ese título' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_video_dto_1.CreateVideoDto]),
    __metadata("design:returntype", video_entity_1.Video)
], VideosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar parcialmente un video' }),
    (0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video actualizado', type: video_entity_1.Video }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Id o datos inválidos / propiedades desconocidas' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No existe un video con ese id' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'El nuevo título ya lo usa otro video' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_video_dto_1.UpdateVideoDto]),
    __metadata("design:returntype", video_entity_1.Video)
], VideosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un video' }),
    (0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Video eliminado (sin cuerpo)' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'El id no es un UUID válido' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No existe un video con ese id' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "remove", null);
exports.VideosController = VideosController = __decorate([
    (0, swagger_1.ApiTags)('videos'),
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map