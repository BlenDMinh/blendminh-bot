import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import InstallCommands from './commands';

async function bootstrap() {
  console.log("Installing commands...");
  await InstallCommands();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
