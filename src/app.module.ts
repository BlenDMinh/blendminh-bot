import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { ConfigModule } from '@nestjs/config';
import { verifyKeyMiddleware } from 'discord-interactions';
import { BotService } from './services/bot.service';
import GeminiService from './services/gemini.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [BotController],
  providers: [GeminiService, BotService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyKeyMiddleware(process.env.PUBLIC_KEY)).forRoutes('interactions');
  }
}
