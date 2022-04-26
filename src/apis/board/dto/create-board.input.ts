import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Board } from '../entities/board.entity';

@InputType()
export class CreateBoardInput extends PartialType(
  OmitType(Board, ['id', 'user']),
  InputType,
) {}
