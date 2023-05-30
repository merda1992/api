import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '@api/users/entities/user.entity';
const bcrypt = require('bcryptjs');


@Injectable()
export class AuthService {
  private jwtSecret = 'my-secret-key'; // задаем секретный ключ

  createToken({ user }: { user: UserEntity }): string {
    const secret = 'secret';
  
    const signOptions: jwt.SignOptions = {
      algorithm: 'HS256',
    };
  
    return jwt.sign({ id: user.id }, secret, signOptions);
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new Error('Invalid token format');
    }
  
    const token = auth.split(' ')[1];
    
    try {
      const payload = await jwt.verify(token, this.jwtSecret);

      return payload;
    } catch (e) {
      throw new Error('Unauthorized');
    }
  }

  async hashPassword (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
}