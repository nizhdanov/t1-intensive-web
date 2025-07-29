import { Container, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import type { Task } from '@/shared/api';

import { TaskForm } from '@/features';
import { ROUTES } from '@/shared/routes';
import { useTaskStore } from '@/shared/stores/taskStore';

export function TaskEditPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = useTaskStore((state) => state.tasks?.[taskId!]);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onSubmit = (values: Omit<Task, 'id'>) => {
    if (!task) return;

    const { id, ...taskWithoutId } = task;

    const changes = Object.fromEntries(Object.entries(values).filter(([key, value]) =>
      taskWithoutId[key as keyof typeof taskWithoutId] !== value)
    );

    updateTask(id, changes);
    navigate(ROUTES.HOME);
  };

  if (!task) {
    return null;
  }

  return (
    <Container size='xs'>
      <Title order={1}>Редактирование</Title>
      <Title c='dimmed' order={3}>Задача #{taskId}</Title>
      <TaskForm task={task} onClose={() => navigate(-1)} onSubmit={onSubmit} />
    </Container>
  );
};
