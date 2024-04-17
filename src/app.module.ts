import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/user-service'),
    UsersModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
