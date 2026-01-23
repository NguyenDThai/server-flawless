import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProduct } from 'src/product/dtos/create.product.dto';
import { ProductService } from 'src/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('user/:userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: CreateProduct,
  ) {
    return this.productService.create(body, userId);
  }
}
