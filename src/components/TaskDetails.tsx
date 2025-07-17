import { Button, Flex, Group, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useGoBack } from '@/shared/hooks';
import { CATEGORIES, PRIORITIES, STATUSES } from '@/utils/constants';

interface TaskDetailsProps {
  task: Task;
  withAsterisk?: boolean;
  onClose?: () => void;
  onSubmit: (values: Record<string, any>) => void;
}

export function TaskDetails({ withAsterisk = false, onSubmit, onClose, task }: TaskDetailsProps) {
  const { goBack } = useGoBack();

  const form = useForm<Omit<Task, 'id'>>({
    mode: 'uncontrolled',
    initialValues: {
      category: task.category,
      description: task.description,
      priority: task.priority,
      status: task.status,
      title: task.title
    }
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Flex gap='md' direction='column'>
        <TextInput
          label='Заголовок'
          withAsterisk={withAsterisk}
          placeholder='Напишите заголовок'
          {...form.getInputProps('title')}
        />
        <Textarea
          label='Описание'
          placeholder='Напишите описание'
          {...form.getInputProps('description')}
        />
        <Select
          data={CATEGORIES}
          label='Категория'
          withAsterisk={withAsterisk}
          placeholder='Выберите категорию'
          {...form.getInputProps('category')}
          allowDeselect={false}
        />
        <Select
          data={STATUSES}
          label='Статус'
          withAsterisk={withAsterisk}
          placeholder='Выберите статус'
          {...form.getInputProps('status')}
          allowDeselect={false}
        />
        <Select
          data={PRIORITIES}
          label='Приоритет'
          withAsterisk={withAsterisk}
          placeholder='Выберите приоритет'
          {...form.getInputProps('priority')}
          allowDeselect={false}
        />
        <Group mt='md' grow>
          <Button type='button' variant='outline' onClick={onClose || goBack}>Отмена</Button>
          <Button type='submit'>Сохранить</Button>
        </Group>
      </Flex>
    </form>
  );
};
