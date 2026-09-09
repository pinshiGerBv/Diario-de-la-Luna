import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://diario-de-la-luna.web.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Habilitar validación automática de los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Rechaza peticiones con propiedades no permitidas
      transform: true, // Transforma los payloads a instancias de las clases DTO
    }),
  );

  const port = (globalThis as any).process?.env?.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend ejecutándose en el puerto: ${port}`);
}

bootstrap();
