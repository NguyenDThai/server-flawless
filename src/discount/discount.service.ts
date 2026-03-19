import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from 'src/discount/dtos/create-discount.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiscountDto) {
    return this.prisma.discount.create({ data: { ...dto } });
  }

  async findAll() {
    const discount = await this.prisma.discount.findMany();

    const now = new Date();
    return discount.map((d) => {
      let status = 'active';
      if (now < d.startDate) {
        status = 'scheduled';
      } else if (now > d.endDate) {
        status = 'expired';
      }

      return {
        ...d,
        status,
      };
    });
  }

  async findById(id: number) {
    return this.prisma.discount.findUnique({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateDiscountDto>) {
    const discount = await this.prisma.discount.findUnique({ where: { id } });

    if (!discount) {
      throw new NotFoundException('Discount not found');
    }

    const now = new Date();

    let status = 'active';
    if (!discount.isActive) {
      status = 'disabled';
    } else if (now < discount.startDate) {
      status = 'scheduled';
    } else if (now > discount.endDate) {
      status = 'expired';
    }

    // Nếu status là lịch trình thì cho sửa toàn bộ mã, còn lại thì chỉ cho sửa 3 field
    if (status !== 'scheduled') {
      const allowedFields = ['quantity', 'endDate', 'isActive'];

      const filteredDto = Object.fromEntries(
        Object.entries(dto).filter(([key]) => allowedFields.includes(key)),
      );

      return this.prisma.discount.update({ where: { id }, data: filteredDto });
    }

    return this.prisma.discount.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.discount.delete({ where: { id } });
  }
}
