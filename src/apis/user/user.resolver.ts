import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAccessGuard } from 'src/common/auth/gql-auth.guards';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAccessGuard)
  @Query(() => User)
  async fetchUser(@CurrentUser() currentUser: ICurrentUser) {
    return this.userService.findUserById({ id: currentUser.id });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
