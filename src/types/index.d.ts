type TaskCategory = 'Bug' | 'Documentation' | 'Feature' | 'Refactor' | 'Test';

type TaskStatus = 'Done' | 'In Progress' | 'To Do';

type TaskPriority = 'High' | 'Low' | 'Medium';

interface Task {
  category: TaskCategory;
  description?: string;
  id: string;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
}
