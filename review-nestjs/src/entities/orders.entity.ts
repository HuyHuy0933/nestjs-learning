import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './items.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNo: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @OneToMany((type) => Item, (item) => item.order)
  items: Item[];
}