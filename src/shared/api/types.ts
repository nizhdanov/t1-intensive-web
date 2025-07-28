export type TaskCategory = 'Bug' | 'Documentation' | 'Feature' | 'Refactor' | 'Test';

export type TaskStatus = 'Done' | 'In Progress' | 'To Do';

export type TaskPriority = 'High' | 'Low' | 'Medium';

export interface Task {
  category: TaskCategory;
  createdAt: string;
  description?: string;
  id: string;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
}
