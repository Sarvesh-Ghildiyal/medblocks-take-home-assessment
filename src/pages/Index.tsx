import { useEffect } from "react";
import { initializeDatabase } from "@/services/database";

export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello Mr.</h1>
      <p>Database initialized in console</p>
    </div>
  );
}
