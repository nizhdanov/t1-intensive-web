export const ROUTES = {
  HOME: '/',
  EDIT_TASK: (id: string) => `task/${id}`,
  CREATE_TASK: 'task/new'
} as const;
