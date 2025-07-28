import type { Task } from '@/shared/api';

import { api } from '@/shared/api/instance';

export const getTaskById = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'GET'
});

export const updateTask = ({ id, options }: RequestParams<{ id: string, dto: Partial<Task> }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'PUT'
});

export const deleteTask = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'DELETE'
});
