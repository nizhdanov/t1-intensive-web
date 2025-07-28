import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './browser-router';
import { Providers } from './Providers';

function init() {
  const rootElement = document.getElementById('root')!;
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Providers>
        <RouterProvider router={browserRouter} />
      </Providers>
    </StrictMode>
  );
}

init();
