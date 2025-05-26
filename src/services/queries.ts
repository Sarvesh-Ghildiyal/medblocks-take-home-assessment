// services/queries.ts
import { useLiveQuery } from "@electric-sql/pglite-react";
import { initializeDatabase } from "./database";

// Insert a patient
export const insertPatient = async (patient) => {
  const db = await initializeDatabase();
  await db.query(
    `INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, address, medical_history)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
    [
      patient.first_name,
      patient.last_name,
      patient.date_of_birth,
      patient.gender,
      patient.phone,
      patient.email,
      patient.address,
      patient.medical_history,
    ]
  );
};

// Hook to get live list of patients
export const useLivePatients = () => {
  return useLiveQuery(`
    SELECT * FROM patients
    ORDER BY created_at DESC
    LIMIT 10;
  `);
};
