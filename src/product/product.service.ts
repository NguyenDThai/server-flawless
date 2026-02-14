import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduct } from 'src/product/dtos/create.product.dto';
import { UpdateProduct } from 'src/product/dtos/update.product.dto';

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
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    const product = this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    id: number,
    body: Partial<UpdateProduct>,
    file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    // Nếu có upload ảnh mới
    if (file) {
      const uploadResult: any = await this.cloudinaryService.uploadImage(file);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      imageUrl = uploadResult;
    }

    return this.prisma.product.update({
      where: { id },
      data: { ...body, ...(imageUrl && { image: imageUrl }) },
    });
  }
}
