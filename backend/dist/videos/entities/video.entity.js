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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const swagger_1 = require("@nestjs/swagger");
class Video {
}
exports.Video = Video;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], Video.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sobreviviendo la noche 5 en FNAF' }),
    __metadata("design:type", String)
], Video.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Roblox' }),
    __metadata("design:type", String)
], Video.prototype, "juego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 754, description: 'Duración en segundos' }),
    __metadata("design:type", Number)
], Video.prototype, "duracionSegundos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['borrador', 'publicado'] }),
    __metadata("design:type", String)
], Video.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], Video.prototype, "etiquetas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], Video.prototype, "creadoEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], Video.prototype, "actualizadoEn", void 0);
//# sourceMappingURL=video.entity.js.map