import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://la-reina-del-mezcal.web.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = (globalThis as any).process?.env?.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend ejecutándose en el puerto: ${port}`);
}

bootstrap();
