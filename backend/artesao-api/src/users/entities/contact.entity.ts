import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonData } from '../../common/entities/common.entity';
import { User } from './user.entity';

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  value: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @Column(() => CommonData, { prefix: '' })
  data: CommonData;
}
