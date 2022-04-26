import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById({ id }) {
    return await this.userRepository.findOne({ id });
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  async create(createUserInput: CreateUserInput) {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(createUserInput.password, saltOrRounds);
    return await this.userRepository.save({ ...createUserInput, password });
  }
}
