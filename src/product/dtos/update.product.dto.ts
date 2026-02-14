import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProduct {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  stock: number;

  image: string;

  @IsOptional()
  isFeatured?: boolean;

  @Type(() => Number)
  categoryId: number;
}
