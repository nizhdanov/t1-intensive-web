import { Button, Container, Group, Stack, Title } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { Task } from '@/shared/api';

import { ROUTES } from '@/shared/routes';
import { useTaskStore } from '@/shared/stores';

import { TaskFilterSortBar } from './TaskFilterSortBar';
import { TaskList } from './TaskList';

export function HomePage() {
  const isLoading = useTaskStore((state) => state.isLoading);

  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <Container>
      <Stack>
        <Group align='center' justify='space-between' mt='lg'>
          <Title order={1}>Менеджер задач</Title>
          <Button component={Link} to={ROUTES.CREATE_TASK}>Новая задача</Button>
        </Group>
        <TaskFilterSortBar setTasks={setTasks} />
        {isLoading && <div>Загрузка...</div>}
        {!isLoading && <TaskList tasks={tasks} />}
        {tasks.length === 0 && !isLoading && <div>Нет задач</div>}
      </Stack>
    </Container>
  );
};
