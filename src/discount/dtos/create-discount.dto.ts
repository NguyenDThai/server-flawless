import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum DisCountType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED',
}

export class CreateDiscountDto {
  @IsString()
  code: string;

  @IsEnum(DisCountType)
  type: DisCountType;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  minAmount?: number;

  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @IsNumber()
  quantity: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
