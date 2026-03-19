import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  receiverName: string;

  @IsString()
  receiverPhone: string;

  @IsString()
  shipppingAddress: string;

  @IsOptional()
  @IsString()
  note?: string;
}
