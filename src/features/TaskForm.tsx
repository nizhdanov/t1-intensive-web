import { Button, Flex, Group, Select, Textarea, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';

import type { Task, TaskCategory, TaskPriority, TaskStatus } from '@/shared/api';

import { CATEGORIES, PRIORITIES, STATUSES } from '@/shared/constants';
import { useGoBack } from '@/shared/hooks';

interface TaskFormProps {
  task?: Task;
  onClose?: () => void;
  onSubmit: (values: Omit<Task, 'id'>) => void;
}

export function TaskForm({ onSubmit, onClose, task }: TaskFormProps) {
  const { goBack } = useGoBack();

  const required = !task;

  const form = useForm<Omit<Task, 'id'>>({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: {
      category: task?.category ?? '' as TaskCategory,
      description: task?.description ?? '',
      priority: task?.priority ?? '' as TaskPriority,
      status: task?.status ?? '' as TaskStatus,
      title: task?.title ?? '',
      createdAt: task?.createdAt ?? dayjs().toISOString()
    },
    validate: {
      category: isNotEmpty(),
      priority: isNotEmpty(),
      status: isNotEmpty(),
      title: isNotEmpty()
    }
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Flex gap='md' direction='column'>
        <TextInput
          label='Заголовок'
          withAsterisk={required}
          placeholder='Напишите заголовок'
          {...form.getInputProps('title')}
        />
        <Textarea
          label='Описание'
          placeholder='Напишите описание'
          {...form.getInputProps('description')}
        />
        <Group grow>
          <Select
            data={PRIORITIES}
            label='Приоритет'
            withAsterisk={required}
            placeholder='Выберите приоритет'
            {...form.getInputProps('priority')}
            allowDeselect={false}
          />
          <Select
            data={STATUSES}
            label='Статус'
            withAsterisk={required}
            placeholder='Выберите статус'
            {...form.getInputProps('status')}
            allowDeselect={false}
          />
        </Group>
        <Group grow>
          <Select
            data={CATEGORIES}
            label='Категория'
            withAsterisk={required}
            placeholder='Выберите категорию'
            {...form.getInputProps('category')}
            allowDeselect={false}
          />
          <DateInput
            label='Дата создания'
            withAsterisk={required}
            {...form.getInputProps('createdAt')}
            allowDeselect={false}
            placeholder='Выберите дату'
            valueFormat='DD.MM.YYYY'
          />
        </Group>

        <Group mt='md' grow>
          <Button type='button' variant='outline' onClick={onClose ?? goBack}>Отмена</Button>
          <Button type='submit'>{ task ? 'Сохранить' : 'Создать' }</Button>
        </Group>
      </Flex>
    </form>
  );
};
