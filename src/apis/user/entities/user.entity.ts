import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role' });

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  @Field(() => Role)
  role: Role;

  /*  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletdAt: Date;
*/
}
