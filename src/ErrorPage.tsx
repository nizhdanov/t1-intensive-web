import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { useNavigate, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <Center h='100svh'>
      <Stack align='center'>
        <Title order={1}>404 😔</Title>
        <Text>Страница не найдена</Text>
        <Button onClick={() => navigate('/', { replace: true })}>
          Вернуться на главную
        </Button>
        <Text fs='italic'>
          {error.statusText || error.message}
        </Text>
      </Stack>
    </Center>
  );
}
