import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Mutation(() => Board)
  createBoard(
    @Args('userId') userId: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return this.boardService.create({ userId, createBoardInput });
  }

  @Query(() => [Board], { name: 'board' })
  findAll() {
    return this.boardService.findAll();
  }

  @Query(() => Board, { name: 'board' })
  findOne(@Args('id') id: string) {
    return this.boardService.findOne(id);
  }

  // @Mutation(() => Board)
  // updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
  //   return this.boardService.update(updateBoardInput.id, updateBoardInput);
  // }

  // @Mutation(() => Board)
  // removeBoard(@Args('id', { type: () => Int }) id: number) {
  //   return this.boardService.remove(id);
  // }
}
