/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AddToCartDto } from 'src/cart/dtos/AddToCartDto.dto';
import { CartService } from './cart.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addToCart(@Req() req, @Body() dto: AddToCartDto) {
    const userId = req.user.id;

    return this.cartService.addToCart(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllProductInCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.findAllProductInCart(userId);
  }
}
