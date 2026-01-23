import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduct } from 'src/product/dtos/create.product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateProduct, userId: number) {
    return this.prisma.product.create({
      data: {
        name: body.name,
        price: Number(body.price),
        userId,
      },
    });
  }
}
