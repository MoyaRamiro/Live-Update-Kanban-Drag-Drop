import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskData } from 'src/types/taskData';

export type TaskDocument = Tasks & Document;

@Schema()
export class Tasks {
  @Prop({ required: true })
  tasks: TaskData[];

  @Prop({ required: true, unique: true })
  columnId: string;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);

//@task.schema.ts @task.service.ts @board.service.ts @board.schema.ts de que forma puedo conectar el columnId de task.schema para que sea el id correspondiente a la columna que pertenece@types
