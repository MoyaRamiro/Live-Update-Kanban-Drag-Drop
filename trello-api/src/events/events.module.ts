import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './events.gateway';
import { Boards, BoardsSchema } from '../schemas/board.schema';
import { BoardService } from '../services/board.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoDbModule } from 'src/mongo-db/mongo-db.module';

@Module({
  imports: [ConfigModule.forRoot(), MongoDbModule],
  providers: [EventsGateway, BoardService],
})
export class EventsModule {}
