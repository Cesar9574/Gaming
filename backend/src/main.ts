import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global: ignora/rechaza campos que no estén en el DTO y convierte tipos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpErrorFilter());

  // CORS solo para el origen exacto del frontend (nada de '*')
  const origen = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';
  app.enableCors({
    origin: origen,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  const config = new DocumentBuilder()
    .setTitle('API Canal Gaming')
    .setDescription('CRUD de videos de un canal de gaming. Datos en memoria.')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  const puerto = Number(process.env.PORT ?? 3000);
  await app.listen(puerto);
  console.log(`API en http://localhost:${puerto}  |  Docs en http://localhost:${puerto}/docs`);
}
bootstrap();
