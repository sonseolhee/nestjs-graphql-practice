import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlRefreshGuard } from 'src/common/auth/gql-auth.guards';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    // user 정보가 있는지 확인
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('Email is not existed!!');

    //비밀번호가 맞는지 확인
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnauthorizedException('Password is not correct!!');

    //refresh-token를 Response cookie에 심기
    this.authService.setRefreshToken({ user, res: context.res });

    return await this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
