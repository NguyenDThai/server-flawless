import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiscountService } from 'src/discount/discount.service';
import { CreateDiscountDto } from 'src/discount/dtos/create-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post('/add')
  async create(@Body() dto: CreateDiscountDto) {
    return this.discountService.create(dto);
  }

  @Get()
  async findAll() {
    return this.discountService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.discountService.findById(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateDiscountDto>,
  ) {
    return this.discountService.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.discountService.remove(Number(id));
  }
}
