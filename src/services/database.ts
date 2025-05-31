// services/database.ts
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live, type PGliteWithLive } from "@electric-sql/pglite/live";

// 👇 This is the actual Worker import
import PGWorker from "../worker/my-pglite-worker.js?worker";

let db: PGliteWithLive | undefined;

export const initializeDatabase = async (): Promise<PGliteWithLive> => {
  if (db) return db;

  try {
    console.log("Initializing PGlite database with Worker + live extension...");

    db = await PGliteWorker.create(
      new PGWorker({
        name: "pglite-worker",
      }),
      {
        extensions: { live },
        dataDir: "idb://my-patient-data",
      }
    );

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender VARCHAR(20) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(255),
        address TEXT,
        medical_history TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database initialized successfully with Worker");
    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};
