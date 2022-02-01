import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('normalEvent')
  async normalEvent(@Payload() data, @Ctx() context: RmqContext) {
    console.log(data);
    this.ack(context);
  }

  @EventPattern('longEvent')
  async longEvent(@Payload() data, @Ctx() context: RmqContext) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log(data);
    this.ack(context);
  }

  private ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
