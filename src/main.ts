import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';



dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  // Enable CORS if you're running frontend and backend on different ports
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://frontendtokossmotors.vercel.app', 
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

 
  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error if extra props exist
      transform: true,            // Auto-transform payloads (e.g. string to number)
      stopAtFirstError: true,
    }),
  );
 const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
 console.log(`🚀 Backend running on http://localhost:${PORT}`)
}
bootstrap();
