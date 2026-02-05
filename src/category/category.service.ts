/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateCategoryDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.prisma.categories.create({
      data: body,
    });
  }

  findAllCate() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.prisma.categories.findMany();
  }

  async deleteCateId(id: number) {
    const count = await this.prisma.product.count({
      where: { categoryId: id },
    });

    if (count > 0) {
      throw new BadRequestException(
        'Không thể xóa vì loại sản phẩm đang có sản phẩm',
      );
    }

    return this.prisma.categories.delete({ where: { id } });
  }
}
