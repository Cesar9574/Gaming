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
exports.CreateVideoDto = exports.ESTADOS = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
exports.ESTADOS = ['borrador', 'publicado'];
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
class CreateVideoDto {
}
exports.CreateVideoDto = CreateVideoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sobreviviendo la noche 5 en FNAF', minLength: 3, maxLength: 80 }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)({ message: 'titulo debe ser texto' }),
    (0, class_validator_1.Length)(3, 80, { message: 'titulo debe tener entre 3 y 80 caracteres' }),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Roblox', minLength: 2, maxLength: 50 }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)({ message: 'juego debe ser texto' }),
    (0, class_validator_1.Length)(2, 50, { message: 'juego debe tener entre 2 y 50 caracteres' }),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "juego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 754, description: 'Duración en segundos (1 a 43200)', minimum: 1, maximum: 43200 }),
    (0, class_validator_1.IsInt)({ message: 'duracionSegundos debe ser un entero' }),
    (0, class_validator_1.Min)(1, { message: 'duracionSegundos debe ser al menos 1' }),
    (0, class_validator_1.Max)(43200, { message: 'duracionSegundos no puede pasar de 43200 (12 horas)' }),
    __metadata("design:type", Number)
], CreateVideoDto.prototype, "duracionSegundos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: exports.ESTADOS, default: 'borrador' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(exports.ESTADOS, { message: 'estado debe ser "borrador" o "publicado"' }),
    __metadata("design:type", Object)
], CreateVideoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['terror', 'gameplay'], maxItems: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'etiquetas debe ser un arreglo' }),
    (0, class_validator_1.ArrayMaxSize)(5, { message: 'etiquetas admite máximo 5 elementos' }),
    (0, class_validator_1.IsString)({ each: true, message: 'cada etiqueta debe ser texto' }),
    (0, class_validator_1.Length)(2, 20, { each: true, message: 'cada etiqueta debe tener entre 2 y 20 caracteres' }),
    __metadata("design:type", Array)
], CreateVideoDto.prototype, "etiquetas", void 0);
//# sourceMappingURL=create-video.dto.js.map