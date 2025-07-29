import type { Task, UpdateTaskDto } from '@/shared/api';

import { api } from '@/shared/api/instance';

export const getTaskById = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'GET'
});

export const updateTask = ({ id, dto, options }: RequestParams<{ id: string, dto: UpdateTaskDto }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'PATCH',
  body: dto
});

export const deleteTask = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'DELETE'
});
