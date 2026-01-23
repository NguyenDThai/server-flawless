import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthLoginDto } from 'src/auth/dtos/AuthLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }
}
