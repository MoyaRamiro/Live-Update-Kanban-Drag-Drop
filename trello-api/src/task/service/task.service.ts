import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks, TaskDocument } from '../../task/schema/task.schema';
import { TaskData } from 'src/types/taskData';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TaskDocument>,
  ) {}

  async update(task: TaskData[], id: string) {
    const updatedTask = await this.tasksModel
      .replaceOne({ id }, { tasks: task, id }, { upsert: true })
      .exec();

    if (!updatedTask) {
      throw new Error('Error al actualizar las tareas');
    }
  }
}
