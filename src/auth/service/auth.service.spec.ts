import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '@api/users/entities/user.entity';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  private jwtSecret = 'my-secret-key';

  createToken({ user }: { user: UserEntity }): string {
    const signOptions: jwt.SignOptions = {
      algorithm: 'HS256',
    };

    return jwt.sign({ id: user.id }, this.jwtSecret, signOptions);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }

  async checkValidPassword(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }
}
