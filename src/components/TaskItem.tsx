import { Badge, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';

type TaskItemProps = Task & {
  onEdit: () => void;
};

const PRIORITY_COLOR_MAP: Record<TaskPriority, string> = {
  'Low': 'green',
  'Medium': 'yellow',
  'High': 'red'
};

const STATUS_COLOR_MAP: Record<TaskStatus, string> = {
  'To Do': 'blue',
  'In Progress': 'yellow',
  'Done': 'green'
};

export function TaskItem({
  onEdit,
  priority,
  status,
  category,
  description,
  title
}: TaskItemProps) {
  return (
    <Paper p='md' shadow='sm' withBorder>
      <Stack h='100%'>
        <Group justify='space-between'>
          <Group gap='xs'>
            <Badge variant='light' color={PRIORITY_COLOR_MAP[priority]}>{priority}</Badge>
            <Badge variant='dot' color={STATUS_COLOR_MAP[status]}>{status}</Badge>
          </Group>
          <Button size='compact-xs' w='fit-content' onClick={onEdit}>
            Редактировать
          </Button>
        </Group>
        <Stack gap='xs'>
          <Title order={5}>
            {title}
          </Title>
          {description && (
            <Text>
              {description}
            </Text>
          )}
        </Stack>
        <Group justify='space-between'>
          {/* Сюда можно вставить дополнительные тэги */}
          <Badge color='grape'>{category}</Badge>
        </Group>
      </Stack>
    </Paper>
  );
};
