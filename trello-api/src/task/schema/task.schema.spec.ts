import { Tasks, TasksSchema } from './task.schema';
import * as mongoose from 'mongoose';
import { TaskData } from 'src/types/taskData';

describe('Tasks Schema', () => {
  it('should be defined', () => {
    // Create a sample task
    const sampleTask: TaskData = {
      id: '1',
      name: 'Test Task',
      isChecked: false,
    };

    // Create a test document
    const Model = mongoose.model('Tasks', TasksSchema);
    const doc = new Model({
      tasks: [sampleTask],
      id: 'test-id',
    });

    // Assertions
    expect(doc).toBeDefined();
    expect(doc.tasks).toHaveLength(1);
    expect(doc.tasks[0].name).toBe('Test Task');
    expect(doc.id).toBe('test-id');
  });
});
