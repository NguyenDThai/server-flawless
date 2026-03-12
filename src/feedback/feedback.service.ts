import { Injectable } from '@nestjs/common';
import { CreateFeeBackDto } from 'src/feedback/dtos/createFeedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFeeBackDto) {
    return this.prisma.feedBack.create({ data: dto });
  }

  findAll() {
    return this.prisma.feedBack.findMany();
  }
}
