import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}
  create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create({ ...createFoodDto });
    console.log(food);
    return this.foodRepository.save(food);
  }

  findAll() {
    return this.foodRepository.find({ where: { status: true } });
  }

  findOne(id: number) {
    return this.foodRepository.findOneBy({ id });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.preload({
      id: id,
      ...updateFoodDto,
    });
    if (!food) {
      throw new BadRequestException(`The food ${food} does not exist!`);
    } else {
      return await this.foodRepository.save(food);
    }
  }
  async remove(id: number) {
    const food = await this.foodRepository.findOne({
      where: { id: id },
    });
    if (!food) {
      throw new BadRequestException(`The food ${food} does not exist!`);
    } else {
      food.status = false;
      return this.foodRepository.save(food);
    }
  }
}
