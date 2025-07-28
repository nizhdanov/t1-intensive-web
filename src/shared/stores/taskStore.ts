import { create } from 'zustand';

import type { Task } from '@/shared/api';

import { createTask, getTasks } from '../api/requests/tasks';
import { deleteTask, updateTask } from '../api/requests/tasks/[id]';

interface State {
  error: unknown | null;
  isLoading: boolean;
  tasks: Record<string, Task> | null;
}

interface Actions {
  createTask: (dto: Omit<Task, 'id'>) => void;
  deleteTask: (id: string) => void;
  fetchTasks: () => void;
  updateTask: (id: string, dto: Omit<Task, 'id'>) => void;
}

export const useTaskStore = create<State & Actions>((set) => {
  const withLoading = async (fn: () => Promise<void>) => {
    set({ isLoading: true, error: null });
    try {
      await fn();
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  };

  return ({
    tasks: null,
    isLoading: false,
    error: null,
    fetchTasks: async () => withLoading(async () => {
      const tasks = await getTasks();
      const tasksMap = Object.fromEntries(tasks.map((task) => [task.id, task]));
      set({ tasks: tasksMap });
    }),
    createTask: async (dto) => withLoading(async () => {
      const task = await createTask({ dto });
      set((state) => ({ tasks: { ...state.tasks, [task.id]: task } }));
    }),
    updateTask: async (id, dto) => withLoading(async () => {
      const task = await updateTask({ id, dto });
      set((state) => ({ tasks: { ...state.tasks, [task.id]: { id, ...dto } } }));
    }),
    deleteTask: async (id) => withLoading(async () => {
      await deleteTask({ id });
      set((state) => {
        if (!state.tasks) return state;
        const { [id]: _, ...rest } = state.tasks;
        return { tasks: rest };
      });
    })
  });
});
