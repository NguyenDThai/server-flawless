import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PingController } from './ping/ping.controller';
import { CartController } from './cart/cart.controller';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProductModule,
    UserModule,
    AuthModule,
    CategoryModule,
    CloudinaryModule,
  ],
  controllers: [AppController, PingController, CartController],
  providers: [AppService, PrismaService, CartService],
})
export class AppModule {}
