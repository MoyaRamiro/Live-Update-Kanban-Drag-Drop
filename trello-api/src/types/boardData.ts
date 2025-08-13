import { TaskData } from './taskData';

export interface BoardData {
  id: string;
  title: string;
  elements: TaskData[];
}
