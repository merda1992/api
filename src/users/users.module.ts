import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { AuthService } from '@api/auth/service/auth.service.spec';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, AuthService],
  exports: [UserService],
})
export class UsersModule {}
