import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonData } from '../../common/entities/common.entity';
import { Contact } from './contact.entity';
import { Password } from './password.entity';
import { UserRoleEnum } from './user-role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.COSTUMER })
  role: UserRoleEnum;

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
  passwords: Password[];

  @Column(() => CommonData, { prefix: '' })
  data: CommonData;

  public toggleActive() {
    this.active = !this.active;
  }
}
