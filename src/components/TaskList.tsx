import { SimpleGrid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../router';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks }: { tasks: Task[] }) {
  const navigate = useNavigate();
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} onEdit={() => navigate(ROUTES.EDIT_TASK(task.id))} />
      ))}
    </SimpleGrid>
  );
};
