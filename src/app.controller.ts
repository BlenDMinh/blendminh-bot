import { Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { InteractionResponseType, InteractionType } from 'discord-interactions';

@Controller("interactions")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return JSON.stringify({ type: InteractionResponseType.PONG });
  }

  @Post()
  @Header('Content-Type', 'application/json')
  test(@Req() request: Request): string {
    const { type, data, id } = request.body;
    if(type === InteractionType.PING) {
      console.log('Received PING');
      return JSON.stringify({ type: InteractionResponseType.PONG });
    }
    else if(type === InteractionType.APPLICATION_COMMAND || type === InteractionType.MESSAGE_COMPONENT) {
      console.log('Received COMMAND');
      return JSON.stringify({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: { content: 'Hello, world!' } });
    }
  }
}
