import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProduct } from 'src/product/dtos/create.product.dto';
import { ProductService } from 'src/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProduct,
  ) {
    return this.productService.create(body, file);
  }

  @Get()
  allProduct() {
    return this.productService.allProduct();
  }
}
