import type { FlatMockServerConfig } from 'mock-config-server';

import { tasks } from './tasks';

const flatMockServerConfig: FlatMockServerConfig = [
  {
    baseUrl: '/api',
    database: {
      data: {
        tasks,
        settings: {
          blocked: false
        }
      }
    }
  }
];

export default flatMockServerConfig;
