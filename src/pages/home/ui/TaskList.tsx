import { SimpleGrid } from '@mantine/core';

import type { Task } from '@/shared/api';

import { TaskItem } from './task-item';

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
        />
      ))}
    </SimpleGrid>
  );
};
