import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtOptions } from '../constants';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { Password } from '../entities/password.entity';
import { User } from '../entities/user.entity';
import { HashService } from './hash.service';

interface SigninResponseDto {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async signup({ email, name, password }: SignupDto): Promise<string> {
    let user = await User.findOneBy({ email });

    if (user) {
      throw new BadRequestException('Já existe um usuário com este email!');
    }

    user = User.create({ name, email });

    const hash = await this.hashService.hash(password);
    const pwd = Password.create({ hash, user });

    user.passwords = [pwd];
    pwd.user = user;

    await user.save();

    return user.id;
  }

  async signin({ email, password }: SigninDto): Promise<SigninResponseDto> {
    const user = await User.findOneBy({ email });

    if (!user) throw new UnauthorizedException('Usuário inexistente!');

    const pwd = await Password.findOneBy({ user: { id: user.id } });

    if (!pwd || !(await this.hashService.compare(password, pwd.hash)))
      throw new UnauthorizedException('Senha incorreta!');

    const payload = {
      sub: user.id,
      name: user.name,
    };
    const accessToken = await this.jwtService.sign(payload);

    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: jwtOptions.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
