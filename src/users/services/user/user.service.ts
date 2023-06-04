import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';

import { Repository } from 'typeorm';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { AuthInput } from '@api/users/inputs/auth.input';
import { AuthService } from '@api/auth/service/auth.service.spec';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async login(
    authInput: AuthInput,
  ): Promise<{ token: string; user: UserEntity }> {
    const { email, password } = authInput;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await this.authService.checkValidPassword(password, user.password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = this.authService.createToken({ user });

    return { token, user };
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const { password } = createUserInput;

    const hash = await this.authService.hashPassword(password);

    return await this.userRepository.save({
      ...createUserInput,
      password: hash,
    });
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const { password, ...otherOption } = updateUserInput;

    let newOptions = {};

    if (password) {
      const hash = await this.authService.hashPassword(password);

      newOptions = { ...otherOption, password: hash };
    }

    await this.userRepository.update(
      { id: updateUserInput.id },
      password ? { ...newOptions } : { ...otherOption },
    );
    return await this.getOneUser(updateUserInput.id);
  }
}
