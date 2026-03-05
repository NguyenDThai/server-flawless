/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AddToCartDto } from 'src/cart/dtos/AddToCartDto.dto';
import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApplyDiscountDto } from 'src/cart/dtos/ApplyDiscountDto.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
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

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:productId')
  async removeItemFromCart(
    @Req() req,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const userId = req.user.id;
    return this.cartService.removeItemFromCart(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('increase/:productId')
  increase(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    const userId = req.user.id;
    return this.cartService.increaseQuantity(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('decrease/:productId')
  decrease(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    const userId = req.user.id;
    return this.cartService.decreaseQuantity(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('apply-discount')
  appDiscount(@Req() req, @Body() dto: ApplyDiscountDto) {
    const userId = req.user.id;
    return this.cartService.applyDiscount(dto.code, userId);
  }
}
