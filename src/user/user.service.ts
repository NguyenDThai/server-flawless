import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: 'user',
      },
    });
  }
}
