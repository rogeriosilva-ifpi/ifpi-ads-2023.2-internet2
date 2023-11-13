import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonData } from '../../common/entities/common.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column(() => CommonData, { prefix: '' })
  data: CommonData;
}
