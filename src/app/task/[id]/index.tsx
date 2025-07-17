import { Container, Title } from '@mantine/core';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { getTaskById, updateTask } from '@/api/requests/tasks/[id]';
import { TaskDetails } from '@/components/TaskDetails';

export async function editTaskLoader({ params }: any) {
  const task = await getTaskById({ id: params.taskId! });
  if (!task) {
    throw new Response('Not Found', {
      status: 404
    });
  }
  return task;
}

export function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = useLoaderData() as Task;

  async function editTask(values: Record<string, any>) {
    await updateTask({
      id: taskId!,
      options: {
        body: values
      }
    });
    navigate('/');
  }

  if (!task) {
    return null;
  }

  return (
    <Container size='xs'>
      <Title order={1}>Задача {taskId}</Title>
      <TaskDetails task={task} onClose={() => navigate(-1)} onSubmit={editTask} />
    </Container>
  );
};
