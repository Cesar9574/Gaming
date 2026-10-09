"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpErrorFilter());
    const origen = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';
    app.enableCors({
        origin: origen,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Canal Gaming')
        .setDescription('CRUD de videos de un canal de gaming. Datos en memoria.')
        .setVersion('1.0')
        .build();
    swagger_1.SwaggerModule.setup('docs', app, swagger_1.SwaggerModule.createDocument(app, config));
    const puerto = Number(process.env.PORT ?? 3000);
    await app.listen(puerto);
    console.log(`API en http://localhost:${puerto}  |  Docs en http://localhost:${puerto}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map