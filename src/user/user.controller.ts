/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Header,
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

  // Lấy thông tin người dùng để kiểm tra đăng nhập, role
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @Header(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  )
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  getMe(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Patch('/role')
  update(@Body() body: UpdateUserRole) {
    return this.userService.update(body);
  }
}
