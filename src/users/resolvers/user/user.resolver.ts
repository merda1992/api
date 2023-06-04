import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';

import { UserService } from '../../services/user/user.service';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { AuthEntity } from '../../entities/user.entity';
import { AuthInput } from '@api/users/inputs/auth.input';
import { JwtAuthGuard } from '@api/auth/jwt-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => AuthEntity)
  async login(@Args('auth') authInput: AuthInput): Promise<AuthEntity> {
    return await this.userService.login(authInput);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Query((returns) => UserEntity, { nullable: true })
  @UseGuards(JwtAuthGuard)
  currentUser(@Context() ctx): UserEntity {
    return ctx.req.user;
  }
}
