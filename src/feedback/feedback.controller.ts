import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.feedBackService.findById(Number(id));
  }

  @Patch(':id')
  updateFeedback(@Param('id') id: string) {
    return this.feedBackService.updateFeedback(Number(id));
  }
}
