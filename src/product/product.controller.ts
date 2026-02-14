import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProduct } from 'src/product/dtos/create.product.dto';
import { UpdateProduct } from 'src/product/dtos/update.product.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProduct,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.update(Number(id), body, file);
  }
}
