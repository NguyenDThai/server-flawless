import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from 'src/discount/dtos/create-discount.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiscountDto) {
    return this.prisma.discount.create({ data: { ...dto } });
  }

  async findAll() {
    return this.prisma.discount.findMany();
  }

  async update(id: number, dto: Partial<CreateDiscountDto>) {
    return this.prisma.discount.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.discount.delete({ where: { id } });
  }
}
