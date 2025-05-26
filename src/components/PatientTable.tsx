/* eslint-disable @typescript-eslint/no-explicit-any */
// patientTable.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Database } from "lucide-react";

interface PatientTableProps {
  queryResults: Record<string, any>[];
}

export const PatientTable: React.FC<PatientTableProps> = ({ queryResults }) => (
  <Card className="rounded-xl p-0 shadow-md border border-gray-200 bg-white backdrop-blur-md">
    <CardHeader className="bg-indigo-600 text-white rounded-t-xl px-6 py-4">
      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
        <Users className="w-5 h-5" />
        <span>Patient Records ({queryResults.length})</span>
      </CardTitle>
    </CardHeader>

    <CardContent className="p-6">
      {queryResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(queryResults[0]).map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {key.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {queryResults.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(row).map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {value?.toString() || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No data to display. Register a patient or run a query.</p>
        </div>
      )}
    </CardContent>
  </Card>
);
