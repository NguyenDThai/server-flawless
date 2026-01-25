import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import bcrypt from 'bcrypt';
import { UpdateUserRole } from 'src/user/dtos/updateRole.dto';

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
        role: 'USER',
      },
    });
  }

  update(body: UpdateUserRole) {
    const { email, role } = body;

    return this.prisma.user.update({
      where: { email },
      data: {
        role,
      },
    });
  }
}
