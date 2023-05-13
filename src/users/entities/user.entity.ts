import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;
}