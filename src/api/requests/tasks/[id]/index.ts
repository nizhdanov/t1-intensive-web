import { api } from '@/api/instance';

export const getTaskById = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'GET'
});

export const updateTask = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'PUT'
});

export const deleteTask = ({ id, options }: RequestParams<{ id: string }>) => api<Task>(`tasks/${id}`, {
  ...options,
  method: 'DELETE'
});
