import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';
import { BotService } from 'src/services/bot.service';

describe('BotController', () => {
  let botController: BotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      providers: [BotService],
    }).compile();

    botController = app.get<BotController>(BotController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(botController.getHello()).toBe('Hello World!');
    });
  });
});
