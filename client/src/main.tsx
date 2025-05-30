import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/setup/routes';
import { AuthProvider } from '@/setup/auth-context';

import './index.css'
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
