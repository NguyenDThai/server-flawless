import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFeeBackDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;
}
