'use client';
import { QueryClient, QueryClientProvider } from 'react-query';

const clientQuery = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={clientQuery}>{children}</QueryClientProvider>
);


export default Provider;