import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Hãy nhập đúng định dạng email' })
  email: string;
  password: string;
}
