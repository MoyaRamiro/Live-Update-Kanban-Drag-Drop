import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskData } from 'src/types/taskData';

export type TaskDocument = Tasks & Document;

@Schema()
export class Tasks {
  @Prop({ required: true })
  tasks: TaskData[];

  @Prop({ required: true, unique: true })
  id: string;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
