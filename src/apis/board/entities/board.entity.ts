import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
