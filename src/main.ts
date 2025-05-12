import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnknownExceptionInterceptor } from './intercepters/unknown-exception.interceptor';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new UnknownExceptionInterceptor());

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['*'],
    credentials: true,
  });

  const seedService = app.get(SeedService);
  await seedService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
