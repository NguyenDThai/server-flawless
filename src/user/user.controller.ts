/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { UpdateUserRole } from 'src/user/dtos/updateRole.dto';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/add')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @Patch('/role')
  update(@Body() body: UpdateUserRole) {
    return this.userService.update(body);
  }
}
