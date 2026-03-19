/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Req, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dtos/createOrder.dto';
import { OrdersService } from 'src/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('checkout')
  async checkout(@Req() req, dto: CreateOrderDto) {
    const userId = req.user.id;
    return await this.orderService.checkout(userId, dto);
  }
}
