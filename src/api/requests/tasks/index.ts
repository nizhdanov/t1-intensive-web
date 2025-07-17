import { api } from '@/api/instance';

export const getTasks = (params?: RequestParams) => api<Task[]>('tasks', {
  ...params?.options,
  method: 'GET'
});
