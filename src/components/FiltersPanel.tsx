import { Group, Select } from '@mantine/core';
import { useEffect, useMemo, useReducer } from 'react';

import { CATEGORIES, PRIORITIES, STATUSES } from '@/utils/constants';

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

interface FiltersPanelProps {
  tasks: Task[] | undefined;
  setFilteredTasks: (params: Task[]) => void;
}

export function FiltersPanel({ tasks, setFilteredTasks }: FiltersPanelProps) {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);

  const filteredTasks = useMemo(() => tasks ? tasks.filter((filter: typeof initialFilters) =>
    (!filters.category || filter.category === filters.category) &&
    (!filters.status || filter.status === filters.status) &&
    (!filters.priority || filter.priority === filters.priority)) : [], [tasks, filters]);

  useEffect(() => {
    setFilteredTasks(filteredTasks);
  }, [filteredTasks]);

  return (
    <Group grow>
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
    </Group>
  );
};
