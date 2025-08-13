import { Task } from './task';

export interface BoardData {
  id: string;
  title: string;
  elements: Task[];
}
