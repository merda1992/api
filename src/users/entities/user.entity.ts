import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Inactive,
  })
  @Index('IDX_USERS_STATUS')
  status: UserStatus;
}

@ObjectType()
@Entity('auth')
export class AuthEntity {
  @Field()
  @Column()
  token: string;

  @Column()
  @Field()
  user: UserEntity;
}