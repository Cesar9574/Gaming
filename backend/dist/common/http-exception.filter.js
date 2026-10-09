"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpErrorFilter = class HttpErrorFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let error = 'Internal Server Error';
        let message = ['Error interno del servidor'];
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            const body = exception.getResponse();
            if (typeof body === 'string') {
                message = [body];
                error = exception.name;
            }
            else {
                const b = body;
                message = Array.isArray(b.message) ? b.message : [b.message ?? exception.message];
                error = b.error ?? exception.name;
            }
        }
        res.status(statusCode).json({
            statusCode,
            error,
            message,
            path: req.url,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.HttpErrorFilter = HttpErrorFilter;
exports.HttpErrorFilter = HttpErrorFilter = __decorate([
    (0, common_1.Catch)()
], HttpErrorFilter);
//# sourceMappingURL=http-exception.filter.js.map