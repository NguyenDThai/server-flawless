import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dtos/createOrder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: number, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;

      for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
          throw new BadRequestException(
            `Product ${item.product.name} is out of stock`,
          );
        }

        totalAmount += Number(item.product.price) * item.quantity;
      }

      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          paymentMethod: 'COD',
          receiverName: dto.receiverName,
          receiverPhone: dto.receiverPhone,
          shipppingAddress: dto.shipppingAddress,
          note: dto.note,
        },
      });

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          },
        });
        // Neu mua hang thi stock giam
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return order;
    });
  }
}
