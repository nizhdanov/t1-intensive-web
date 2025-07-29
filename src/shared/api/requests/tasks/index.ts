import type { CreateTaskDto, Task } from '@/shared/api';

import { api } from '@/shared/api/instance';

export const getTasks = (params?: RequestParams) => api<Task[]>('tasks', {
  ...params?.options,
  method: 'GET'
});

export const createTask = ({ options, dto }: RequestParams<{ dto: CreateTaskDto }>) => api<Task>('tasks', {
  ...options,
  method: 'POST',
  body: dto
});
