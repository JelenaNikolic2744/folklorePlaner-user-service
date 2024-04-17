import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Money, MoneySchema } from './money.schema';
import { Rehearsal, RehearsalSchema } from './rehearsals.schema';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Rehearsal.name, schema: RehearsalSchema },
      { name: Money.name, schema: MoneySchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
