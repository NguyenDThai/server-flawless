import { IsNotEmpty, Min } from 'class-validator';

export class CreateProduct {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Min(1)
  price: number;
}
