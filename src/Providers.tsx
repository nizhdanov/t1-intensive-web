import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
};
