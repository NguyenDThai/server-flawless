import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduct } from 'src/product/dtos/create.product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(body: CreateProduct, file: Express.Multer.File) {
    const uploadResult: any = await this.cloudinaryService.uploadImage(file);

    return this.prisma.product.create({
      data: {
        ...body,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        image: uploadResult,
      },
    });
  }

  allProduct() {
    return this.prisma.product.findMany();
  }
}
