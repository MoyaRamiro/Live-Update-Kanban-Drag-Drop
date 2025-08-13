import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Boards, BoardsSchema } from 'src/board/schema/board.schema';
import { Tasks, TasksSchema } from 'src/task/schema/task.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Boards.name, schema: BoardsSchema }]),
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
