import { Select, SimpleGrid } from '@mantine/core';
import { useEffect, useMemo, useReducer, useState } from 'react';

import type { Task, TaskCategory, TaskPriority, TaskStatus } from '@/shared/api';

import { CATEGORIES, PRIORITIES, STATUSES } from '@/shared/constants';
import { useTaskStore } from '@/shared/stores';

const initialFilters: Record<'category' | 'priority' | 'status', string | null> = {
  category: null,
  status: null,
  priority: null
};

type Payload = string | null;

type FilterAction =
  | { type: 'RESET' }
  | { type: 'SET_CATEGORY'; payload: Payload }
  | { type: 'SET_PRIORITY'; payload: Payload }
  | { type: 'SET_STATUS'; payload: Payload };

function filterReducer(state: typeof initialFilters, action: FilterAction) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_PRIORITY':
      return { ...state, priority: action.payload };
    case 'RESET':
      return initialFilters;
    default:
      return state;
  }
}

type OrderedSortingType = 'category' | 'priority' | 'status';
type UnroderedSortingType = 'createdAt';
type SortingType = OrderedSortingType | UnroderedSortingType;

const sortingTypeToOrder: Record<
  OrderedSortingType,
  TaskCategory[] | TaskPriority[] | TaskStatus[]
> = {
  category: CATEGORIES,
  priority: PRIORITIES,
  status: STATUSES
};

const sortingTypesData: { label: string; value: SortingType }[] = [{
  label: 'Категория',
  value: 'category'
}, {
  label: 'Дата создания',
  value: 'createdAt'
}, {
  label: 'Приоритет',
  value: 'priority'
}, {
  label: 'Статус',
  value: 'status'
}];

interface TaskFilterSortBarProps {
  setTasks: (tasks: Task[]) => void;
}

export function TaskFilterSortBar({ setTasks }: TaskFilterSortBarProps) {
  const tasks = useTaskStore((state) => state.tasks);

  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  const [sortingType, setSortingType] = useState<SortingType>('createdAt');
  const filterFn = (task: Task) =>
    (!filters.category || task.category === filters.category) &&
    (!filters.status || task.status === filters.status) &&
    (!filters.priority || task.priority === filters.priority);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return Object.values(tasks).filter(filterFn);
  }, [tasks, filters]);

  const sortedTasks = useMemo(() => {
    if (sortingType === 'createdAt') {
      return filteredTasks.toSorted((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    const order = sortingTypeToOrder[sortingType].reduce((acc, value, index) => {
      acc[value] = index;
      return acc;
    }, {} as Record<Task[typeof sortingType], number>);

    return filteredTasks.toSorted((a, b) =>
      (order[a[sortingType]]) - (order[b[sortingType]])
    );
  }, [filteredTasks, sortingType]);

  useEffect(() => {
    if (!sortedTasks) return;
    setTasks(sortedTasks);
  }, [sortedTasks]);

  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }}>
      <Select
        clearable
        data={CATEGORIES}
        value={filters.category}
        onChange={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })}
        placeholder='Категория'
      />
      <Select
        clearable
        data={PRIORITIES}
        value={filters.priority}
        onChange={(value) => dispatch({ type: 'SET_PRIORITY', payload: value })}
        placeholder='Приоритет'
      />
      <Select
        clearable
        data={STATUSES}
        value={filters.status}
        onChange={(value) => dispatch({ type: 'SET_STATUS', payload: value })}
        placeholder='Статус'
      />
      <Select
        data={sortingTypesData}
        value={sortingType}
        allowDeselect={false}
        onChange={(value) => setSortingType(value as SortingType)}
        placeholder='Сортировать по'
      />
    </SimpleGrid>
  );
};
