import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

interface ToggleActiveRequest {
  currentUser: User;
  userId: string;
}

@Injectable()
export class UsersService {
  async toggleActive({
    currentUser,
    userId,
  }: ToggleActiveRequest): Promise<boolean> {
    if (currentUser.id === userId) {
      throw new BadRequestException(
        'Não é possível um ADMIN de auto desativar!',
      );
    }
    const user = await this.findOneByIdOrFail(userId);
    user.toggleActive();
    user.save();
    return true;
  }

  async findOneById(id: string) {
    return User.findOneBy({ id });
  }

  async findOneByIdOrFail(id: string) {
    return User.findOneByOrFail({ id });
  }

  async findOneActiveByIdOrFail(id: string) {
    return User.findOneByOrFail({ id, active: true });
  }
}
