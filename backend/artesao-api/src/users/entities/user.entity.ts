import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonData } from '../../common/entities/common.entity';
import { Contact } from './contact.entity';
import { Password } from './password.entity';

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

  // Class USER
  @OneToMany(() => Contact, (contact) => contact.user, {
    eager: true,
    cascade: true, // propaga tudo
    onDelete: 'CASCADE',
    nullable: true,
  })
  contacts: Contact[];

  @OneToOne(() => Password, (password) => password.user, {
    lazy: true,
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
    nullable: true,
  })
  passwords: Promise<Password[]>;

  @Column(() => CommonData, { prefix: '' })
  data: CommonData;
}
