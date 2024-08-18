import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const QueryClientProvider: ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element = ({ children }) => {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
};

export default QueryClientProvider;
