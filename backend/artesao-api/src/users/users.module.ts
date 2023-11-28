import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { HashService } from './auth/hash.service';
import { jwtOptions } from './constants';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtOptions.secret,
      signOptions: { expiresIn: jwtOptions.expiresIn },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    AuthService,
    HashService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UsersModule {}
