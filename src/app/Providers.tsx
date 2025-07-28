import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/ru';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: 'ru' }}>
        {children}
      </DatesProvider>
    </MantineProvider>
  );
};
