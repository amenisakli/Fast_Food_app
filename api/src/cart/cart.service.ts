import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from 'src/food/entities/food.entity';
import { error } from 'console';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async addToCart(createCartDto: CreateCartDto): Promise<Cart> {
    const food = await this.foodRepository.findOne({
      where: { id: createCartDto.foodId },
    });

    if (!food) {
      throw new Error('Food not found');
    }
    const cartItem = this.cartRepository.create({
      food: food,
      quantity: createCartDto.quantity,
    });

    return this.cartRepository.save(cartItem);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }
  confirmer() {}
  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.preload({
      id: id,
      ...updateCartDto,
    });
    if (!cart) {
      throw new error(`Cart n'exsit pas`);
    } else {
      return this.cartRepository.save(cart);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
