import { IsEmail, IsEnum } from 'class-validator';
import { Role } from 'types/role.enum';

export class UpdateUserRole {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
