import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Food])],
  controllers: [CartController],
  providers: [CartService, FoodService],
})
export class CartModule {}
