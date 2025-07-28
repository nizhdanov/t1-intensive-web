import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { TaskCreatePage } from '@/pages/task-create';
import { TaskEditPage } from '@/pages/task-edit';
import { ROUTES } from '@/shared/routes';
import { useTaskStore } from '@/shared/stores';

import { ErrorPage } from './ErrorPage';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    loader: () => {
      useTaskStore.getState().fetchTasks();
      return null;
    },
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: ROUTES.EDIT_TASK(':taskId'),
        element: <TaskEditPage />
      },
      {
        path: ROUTES.CREATE_TASK,
        element: <TaskCreatePage />
      }
    ]
  }
]);
