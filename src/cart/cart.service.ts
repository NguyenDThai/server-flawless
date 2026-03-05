/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddToCartDto } from 'src/cart/dtos/AddToCartDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    if (product.stock < dto.quantity) {
      throw new BadRequestException('Số lượng sản phẩm không đủ');
    }

    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + dto.quantity;

      if (newQuantity > product.stock) {
        throw new BadRequestException('Sản phẩm đã hết hàng');
      }

      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });
    }

    return this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  // Hien thi san pham trong gio hang

  async findAllProductInCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: {
            id: 'asc',
          },
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return {
        item: [],
        totalAmount: 0,
      };
    }

    // Tinh tong tien
    const totalAmount = cart.items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);

    // Tinh tong so luong san pham
    const totalQuantity = cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    return {
      ...cart,
      totalAmount,
      totalQuantity,
    };
  }

  // Xoa san pham
  async removeItemFromCart(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId: productId },
    });

    return this.findAllProductInCart(userId);
  }

  // Tang san pham
  async increaseQuantity(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    return this.findAllProductInCart(userId);
  }

  // Giam san pham
  async decreaseQuantity(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Item not found');
    }
    if (cartItem.quantity <= 1) {
      await this.prisma.cartItem.delete({
        where: { cartId_productId: { cartId: cart.id, productId } },
      });
    } else {
      await this.prisma.cartItem.update({
        where: { cartId_productId: { cartId: cart.id, productId } },
        data: { quantity: { decrement: 1 } },
      });
    }

    return this.findAllProductInCart(userId);
  }

  // Áp dụng mã giảm giá cho đơn hàng
  async applyDiscount(code: string, userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: { include: { product: true } },
        discount: true,
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    const discount = await this.prisma.discount.findUnique({ where: { code } });

    if (!discount) {
      throw new BadRequestException('Invalid discount code ');
    }

    if (!discount.isActive) {
      throw new BadRequestException('Discount is not active');
    }

    const now = new Date();
    if (now < discount.startDate || now > discount.endDate) {
      throw new BadRequestException('Discount expired');
    }

    if (discount.minAmount && subtotal < discount.minAmount) {
      throw new BadRequestException(`Minimum order is ${discount.minAmount}`);
    }

    let discountAmount = 0;
    if (discount.type === 'PERCENT') {
      discountAmount = (subtotal * discount.value) / 100;

      if (discount.maxDiscount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscount);
      }
    } else {
      discountAmount = discount.value;
    }

    const total = subtotal - discountAmount;

    await this.prisma.cart.update({
      where: { id: cart.id },
      data: { discountId: discount.id },
    });

    const updatedCart = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: { product: true },
        },
        discount: true,
      },
    });

    return {
      cart: updatedCart,
      subtotal,
      discountAmount,
      total: total < 0 ? 0 : total,
    };
  }
}
