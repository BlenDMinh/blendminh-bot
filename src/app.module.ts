import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DiscordRequestVerifier from './middleware/discord-request-verifier';
import { ConfigModule } from '@nestjs/config';
import { verifyKeyMiddleware } from 'discord-interactions';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyKeyMiddleware(process.env.PUBLIC_KEY)).forRoutes('interactions');
  }
}
