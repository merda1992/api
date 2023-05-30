const bcrypt = require('bcryptjs');

import jsonwebtoken from 'jsonwebtoken';
import { UserEntity } from '@api/users/entities/user.entity';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export function createToken({
  user,
  publicApi,
}: {
  user: UserEntity;
  publicApi?: boolean;
}): string {
  const secret = publicApi
    ? process.env.PUBLIC_API_JWT_SECRET
    : process.env.JWT_SECRET;

  const signOptions: jsonwebtoken.SignOptions = {
    algorithm: 'HS256',
  };

  return jsonwebtoken.sign({ id: user.id }, secret, signOptions);
}
