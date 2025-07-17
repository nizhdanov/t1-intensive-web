import { createBrowserRouter } from 'react-router-dom';

import { IndexPage } from './app';
import { editTaskLoader, EditTaskPage } from './app/task/[id]';
import { ErrorPage } from './ErrorPage';

export const ROUTES = {
  EDIT_TASK: (id: string) => `task/${id}`
};

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: 'task/:taskId',
        element: <EditTaskPage />,
        loader: editTaskLoader
      }
    ]
  }
]);
