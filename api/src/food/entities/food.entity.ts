import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  time_cooking: string;

  @Column({ nullable: true })
  like: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ default: true })
  status: boolean;
}
