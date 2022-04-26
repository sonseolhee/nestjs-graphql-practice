import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ userId: id, createBoardInput: CreateBoardInput }) {
    const user = await this.userRepository.findOne(id);
    return await this.boardRepository.save({ ...CreateBoardInput, user });
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string) {
    return await this.boardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  // update(id: number, updateBoardInput: UpdateBoardInput) {
  //   return `This action updates a #${id} board`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} board`;
  // }
}
