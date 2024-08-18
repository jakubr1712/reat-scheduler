import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SchedulerApp from "./components/SchedulerApp";

import QueryClientProvider from "./QueryClientProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <SchedulerApp />
    </QueryClientProvider>
  </StrictMode>
);
