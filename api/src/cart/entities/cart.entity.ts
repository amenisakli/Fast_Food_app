import { Food } from 'src/food/entities/food.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 1 })
  quantity: number;

  @Column({ nullable: true, default: 1 })
  totalPrice: number;

  @ManyToOne(() => Food, { eager: true })
  food: Food;

  @Column({ nullable: true, default: false })
  etat: boolean;
}
