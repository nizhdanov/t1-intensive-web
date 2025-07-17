import { Container, Stack, Title } from '@mantine/core';
import { useState } from 'react';

import { getTasks } from '@/api/requests/tasks';
import { FiltersPanel, TaskList } from '@/components';
import { useAsync } from '@/shared/hooks';

export function IndexPage() {
  const { data: tasks, isLoading } = useAsync(getTasks, []);
  const [filteredTasks, setFilteredTasks] = useState(tasks ?? []);

  return (
    <Container>
      <Stack>
        <Title order={1}>Менеджер задач</Title>
        <FiltersPanel {...{ tasks, setFilteredTasks }} />
        {isLoading && <div>Loading...</div>}
        <TaskList tasks={filteredTasks} />
      </Stack>
    </Container>
  );
};
