import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from './auth/decorators/get-user.decorator';
import { Roles } from './auth/decorators/roles.decorator';
import { UserRoleEnum } from './entities/user-role.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRoleEnum.ADMIN)
  @Post(':id/toggle-active')
  async toggleActive(
    @Param('id') userId: string,
    @Res() res: Response,
    @GetUser() currentUser: User,
  ) {
    await this.usersService.toggleActive({ userId, currentUser });
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
