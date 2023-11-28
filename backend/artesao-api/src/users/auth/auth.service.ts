import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtOptions } from '../constants';
import { RefreshDto } from '../dto/refresh.dto';
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
      type: 'access',
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      {
        ...payload,
        type: 'refresh',
      },
      {
        expiresIn: jwtOptions.refreshExpiresIn,
      },
    );

    return { accessToken, refreshToken };
  }

  async refreshTokens({ token }: RefreshDto): Promise<SigninResponseDto> {
    let data; //payload
    try {
      data = await this.jwtService.verifyAsync(token, {
        secret: jwtOptions.secret,
      });
      if (data['type'] !== 'refresh') {
        throw new UnauthorizedException('Token not type "refresh"!');
      }
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Token inválido!');
    }
    const userId = data['sub'];
    const user = await User.findOneBy({ id: userId });

    if (!user) throw new UnauthorizedException('Usuário inexistente!');

    const payload = {
      sub: user.id,
      name: user.name,
      type: 'access',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      {
        type: 'refresh',
        ...payload,
      },
      {
        expiresIn: jwtOptions.refreshExpiresIn,
      },
    );

    return { accessToken, refreshToken };
  }
}
