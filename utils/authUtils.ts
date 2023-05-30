const bcrypt = require('bcryptjs');

import * as jwt from 'jsonwebtoken';
import { UserEntity } from '@api/users/entities/user.entity';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export function createToken({ user }: { user: UserEntity }): string {
  const secret = 'secret';

  const signOptions: jwt.SignOptions = {
    algorithm: 'HS256',
  };

  return jwt.sign({ id: user.id }, secret, signOptions);
}
