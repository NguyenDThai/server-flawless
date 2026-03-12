import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFeeBackDto } from 'src/feedback/dtos/createFeedback.dto';
import { FeedbackService } from 'src/feedback/feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedBackService: FeedbackService) {}

  @Post('add')
  create(@Body() dto: CreateFeeBackDto) {
    return this.feedBackService.create(dto);
  }

  @Get()
  findAll() {
    return this.feedBackService.findAll();
  }
}
