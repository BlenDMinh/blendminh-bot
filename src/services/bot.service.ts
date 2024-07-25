import { Injectable } from '@nestjs/common';
import GeminiService from './gemini.service';
import { InteractionResponseType, MessageComponentTypes } from 'discord-interactions';

@Injectable()
export class BotService {
  constructor(private readonly geminiService: GeminiService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async handleCommand(data, id, from): Promise<string> {
    const name = data.name
    if(name === 'gemini' && id) {
      const prompt = data.options.find(option => option.name === 'prompt').value;
      const response = await this.geminiService.generateText(prompt);
      const content = `Prompt: ${prompt} from <@${from.id}>\n${response.text}\nThis response was generated with ${response.tokens} tokens.`
      console.log(content);
      return JSON.stringify({ 
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, 
        data: { 
          content: content,
        } 
      });
    }
    return JSON.stringify({ type: 1 });
  }
}
