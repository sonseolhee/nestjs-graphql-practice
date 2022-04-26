import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { GqlAccessGuard } from 'src/common/auth/gql-auth.guards';
import { JwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';
import { CreateUserInput } from '../dto/createUser.input';
import { Role, User } from '../entities/user.entity';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

const createUserInput: CreateUserInput = {
  email: 'test@gmail.com',
  name: 'test',
  password: 'testpwd',
  phone: '010-1234-5678',
  role: Role.USER,
};

class MockGqlGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [UserResolver, JwtAccessStrategy],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            create: jest.fn().mockReturnValue({
              id: 'testuuid',
              email: 'test@gmail.com',
              name: 'test',
              password: 'testpwd',
              phone: '010-1234-5678',
              role: Role.USER,
            }),
          };
        }
      })
      .overrideGuard(GqlAccessGuard)
      .useValue(MockGqlGuard)
      .compile();

    userResolver = moduleRef.get<UserResolver>(UserResolver);
  });

  describe('create', () => {
    it('should return user created', async () => {
      const result: User = {
        id: 'testuuid',
        email: 'test@gmail.com',
        name: 'test',
        password: 'testpwd',
        phone: '010-1234-5678',
        role: Role.USER,
      };

      expect(await userResolver.createUser(createUserInput)).toStrictEqual(
        result,
      );
    });
  });
});
