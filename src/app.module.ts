import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    BoardModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'practiceDB',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'practicedb',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true, //shouldn't be used in production level
      logging: true,
    }),
  ],
})
export class AppModule {}
