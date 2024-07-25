import { Controller, Get, Header, Post, Req } from '@nestjs/common';
import { Request, response } from 'express';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { BotService } from 'src/services/bot.service';

@Controller("interactions")
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  getHello(): string {
    return JSON.stringify({ type: InteractionResponseType.PONG });
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async discordHandler(@Req() request: Request) {
    const { type, data, id } = request.body;
    const user = request.body.member.user;
    
    if(type === InteractionType.PING) {
      console.log('Received PING');
      return JSON.stringify({ type: InteractionResponseType.PONG });
    }

    else if(type === InteractionType.APPLICATION_COMMAND || type === InteractionType.MESSAGE_COMPONENT) {
      console.log('Received COMMAND');
      const response = await this.botService.handleCommand(data, id, user);
      return response;
    }
  }

  // @Post()
  // @Header('Content-Type', 'application/json')
  // test(@Req() request: Request): string {
  //   console.log(request.body)
  //   const { type, data, id } = request.body;
  //   if(type === InteractionType.PING) {
  //     console.log('Received PING');
  //     return JSON.stringify({ type: InteractionResponseType.PONG });
  //   }
  //   else if(type === InteractionType.APPLICATION_COMMAND || type === InteractionType.MESSAGE_COMPONENT) {
  //     console.log('Received COMMAND');
  //     return JSON.stringify({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: { content: 'Hello, world!' } });
  //   }
  // }
}
