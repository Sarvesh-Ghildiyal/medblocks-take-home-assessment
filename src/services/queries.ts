import { usePGlite } from "@electric-sql/pglite-react";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { useCallback } from "react";
import type { Patient, PatientFormData } from "./types";

// Insert patient
export const useAddPatient = () => {
  const db = usePGlite();

  return useCallback(
    async (formData: PatientFormData) => {
      await db.query(
        `INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, address, medical_history)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          formData.firstName,
          formData.lastName,
          formData.dateOfBirth,
          formData.gender,
          formData.phone,
          formData.email,
          formData.address,
          formData.medicalHistory,
        ]
      );
    },
    [db]
  );
};

export const useLivePatients = () => {
  return useLiveQuery<Patient>(
    `SELECT * FROM patients ORDER BY created_at DESC`
  );
};
