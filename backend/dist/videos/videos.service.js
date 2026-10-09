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
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let VideosService = class VideosService {
    constructor() {
        this.videos = new Map();
        this.sembrar();
    }
    findAll() {
        return [...this.videos.values()];
    }
    findOne(id) {
        const video = this.videos.get(id);
        if (!video) {
            throw new common_1.NotFoundException(`No existe un video con id ${id}`);
        }
        return video;
    }
    create(dto) {
        this.verificarTituloUnico(dto.titulo);
        const ahora = new Date().toISOString();
        const video = {
            id: (0, crypto_1.randomUUID)(),
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
    update(id, dto) {
        const actual = this.findOne(id);
        if (dto.titulo !== undefined) {
            this.verificarTituloUnico(dto.titulo, id);
        }
        const actualizado = {
            ...actual,
            ...dto,
            id: actual.id,
            creadoEn: actual.creadoEn,
            actualizadoEn: new Date().toISOString(),
        };
        this.videos.set(id, actualizado);
        return actualizado;
    }
    remove(id) {
        this.findOne(id);
        this.videos.delete(id);
    }
    verificarTituloUnico(titulo, ignorarId) {
        const buscado = titulo.toLowerCase();
        for (const v of this.videos.values()) {
            if (v.id !== ignorarId && v.titulo.toLowerCase() === buscado) {
                throw new common_1.ConflictException(`Ya existe un video con el título "${v.titulo}"`);
            }
        }
    }
    sembrar() {
        const datos = [
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
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VideosService);
//# sourceMappingURL=videos.service.js.map