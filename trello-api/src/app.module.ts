import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { BoardService } from './services/board.service';
import { EventsGateway } from './events/events.gateway';

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
