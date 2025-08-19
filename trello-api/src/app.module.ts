import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { EventsGateway } from './events/events.gateway';
import { BoardService } from './board/service/board.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoDbModule,
  ],
  providers: [EventsGateway, BoardService],
})
export class AppModule {}
