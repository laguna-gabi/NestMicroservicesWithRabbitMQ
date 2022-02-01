import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Get('sendNormalEvent')
  sendNormalEvent() {
    return this.client.emit('normalEvent', { test: 'test' });
  }

  @Get('sendLongEvent')
  sendLongEvent() {
    return this.client.emit('longEvent', { test: 'test' });
  }
}
