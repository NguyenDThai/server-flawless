/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, NotFoundException } from '@nestjs/common';
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

  findById(id: number) {
    const feedBack = this.prisma.feedBack.findUnique({ where: { id } });

    if (!feedBack) {
      throw new NotFoundException('Feedback not found');
    }

    return feedBack;
  }

  updateFeedback(id: number) {
    return this.prisma.feedBack.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
