import { Container, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import type { Task } from '@/shared/api';

import { TaskForm } from '@/features';
import { ROUTES } from '@/shared/routes';
import { useTaskStore } from '@/shared/stores';

export function TaskCreatePage() {
  const createTask = useTaskStore((state) => state.createTask);
  const navigate = useNavigate();

  const onSubmit = (task: Omit<Task, 'id'>) => {
    createTask(task);
    navigate(ROUTES.HOME);
  };

  return (
    <Container size='xs'>
      <Title order={1}>Новая задача</Title>
      <TaskForm onClose={() => navigate(-1)} onSubmit={onSubmit} />
    </Container>
  );
};
