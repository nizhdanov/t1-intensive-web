import type { TaskCategory, TaskPriority, TaskStatus } from './api/types';

export const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];
export const STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
export const CATEGORIES: TaskCategory[] = ['Bug', 'Documentation', 'Feature', 'Refactor', 'Test'];
