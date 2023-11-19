import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltOrRounds = 13;

  async hash(password) {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
