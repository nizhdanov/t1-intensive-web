import type { FlatMockServerConfig } from 'mock-config-server';

import { tasks } from './tasks';

const flatMockServerConfig: FlatMockServerConfig = [
  {
    baseUrl: '/api',
    database: {
      data: {
        tasks
      }
    },
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  }
];

export default flatMockServerConfig;
