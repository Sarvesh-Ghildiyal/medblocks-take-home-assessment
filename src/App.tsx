// app.tsx

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Database related imports
import { PGliteProvider } from "@electric-sql/pglite-react";
import { initializeDatabase } from "@/services/database";
import type { PGliteWithLive } from "@electric-sql/pglite/live";

const App = () => {
  const [db, setDb] = useState<PGliteWithLive | null>(null);

  useEffect(() => {
    const setupDb = async () => {
      const dbInstance = await initializeDatabase();
      setDb(dbInstance);
    };
    setupDb();
  }, []);

  if (!db) return <div>Loading database...</div>; // You can replace with a spinner
  
  return (
    <PGliteProvider db={db}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PGliteProvider>
  );
};

export default App;
