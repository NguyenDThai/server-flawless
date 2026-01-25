import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/add')
  create(@Body() body: CreateCategoryDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.categoryService.create(body);
  }

  @Get()
  findAllCate() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.categoryService.findAllCate();
  }
}
