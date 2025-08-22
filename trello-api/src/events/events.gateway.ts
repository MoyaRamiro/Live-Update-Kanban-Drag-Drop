import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardService } from '../board/service/board.service';
import { BoardData } from 'src/types/boardData';
import { TaskData } from 'src/types/taskData';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly boardService: BoardService) {}

  async afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  async handleConnection(client: Socket) {
    await this.boardService.initializeDefaultBoards();
    console.log(`Client connected: ${client.id}`);
    this.server.emit('initialBoardData', await this.boardService.findAll());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('boardsUpdate')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { boardData: BoardData[] },
  ) {
    await this.boardService.update(data.boardData);
    client.broadcast.emit('updateColumnsData', data.boardData);
    console.log('emitiendo boards', data.boardData);
  }

  @SubscribeMessage('tasksUpdate')
  async handleTaskUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { taskData: TaskData[]; boardId: string },
  ) {
    const boards = await this.boardService.findAll();
    const updatedBoards = boards.map((board) =>
      board.id === data.boardId ? { ...board, elements: data.taskData } : board,
    );

    await this.boardService.update(updatedBoards);
    client.broadcast.emit('updateTasksData', {
      taskData: data.taskData,
      boardId: data.boardId,
    });
    console.log('emitiendo tasks', data.taskData);
  }
}
