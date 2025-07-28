import { ActionIcon, Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import type { Task, TaskPriority, TaskStatus } from '@/shared/api';

import { BinIcon } from '@/shared/icons/BinIcon';
import { ROUTES } from '@/shared/routes';
import { useTaskStore } from '@/shared/stores';

import styles from './TaskItem.module.css';

type TaskItemProps = Task;

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
  priority,
  status,
  createdAt,
  category,
  description,
  title,
  id
}: TaskItemProps) {
  const navigate = useNavigate();
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const onRemove = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    deleteTask(id);
  };

  const onEdit = () => {
    navigate(ROUTES.EDIT_TASK(id));
  };

  return (
    <Paper className={styles.card} p='md' onClick={onEdit} shadow='sm' withBorder>
      <Stack h='100%'>
        <Group justify='space-between'>
          <Group gap='xs'>
            <Badge variant='light' color={PRIORITY_COLOR_MAP[priority]}>{priority}</Badge>
            <Badge variant='dot' color={STATUS_COLOR_MAP[status]}>{status}</Badge>
          </Group>
          <Text c='dimmed' size='xs'>
            {dayjs(createdAt).format('DD.MM.YYYY')}
          </Text>
          <ActionIcon
            size='sm'
            color='red'
            onClick={onRemove}
          >
            <BinIcon height={16} width={16} />
          </ActionIcon>
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
