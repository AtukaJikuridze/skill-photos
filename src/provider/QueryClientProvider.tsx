import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create the query client and configure it globally
const queryClient = new QueryClient();

// Provide the QueryClient globally to your app
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
