import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AUTH_MESSAGES } from './auth/messages/auth.message';
import { validationExceptionFactory } from './common/exceptions/validation.factory';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log'],
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - AlphaPlay')
    .setDescription(AUTH_MESSAGES.SWAGGER_DESCRIPTION)
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  await app.listen(port, function () {
    console.log(`BACKEND is running on port ${port}.`);
  });
}
void bootstrap();
