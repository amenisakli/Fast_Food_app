import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import * as multer from 'multer';
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(
    @Body() createFoodDto: CreateFoodDto,
    @UploadedFile() file: multer.File,
  ) {
    try {
      let fileBase64: string | null = null;
      if (file) {
        const fileData = file.buffer.toString('base64');
        createFoodDto.picture = `data:${file.mimetype};base64,${fileData}`;
      }
      return await this.foodService.create(createFoodDto);
    } catch (error) {
      throw new BadRequestException('Unable to create message.');
    }
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    const foodId = parseInt(id, 10);
    if (isNaN(foodId)) {
      throw new BadRequestException('Invalid id');
    }
    return this.foodService.update(foodId, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
