// sqlQueryInterface.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Database } from "lucide-react";

interface SqlQueryInterfaceProps {
  sqlQuery: string;
  setSqlQuery: (sql: string) => void;
  executeQuery: () => void;
  isQuerying: boolean;
}

export const SqlQueryInterface: React.FC<SqlQueryInterfaceProps> = ({
  sqlQuery,
  setSqlQuery,
  executeQuery,
  isQuerying,
}) => (
  <Card className="rounded-xl shadow-md border p-0 border-gray-200 bg-white backdrop-blur-md">
    <CardHeader className="bg-green-600 text-white rounded-t-xl px-6 py-4">
      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
        <Database className="w-5 h-5" />
        <span>SQL Query Interface</span>
      </CardTitle>
    </CardHeader>

    <CardContent className="p-6 space-y-6">
      <div>
        <Label htmlFor="sqlQuery" className="text-sm font-medium text-gray-700">
          Raw SQL Query
        </Label>
        <Textarea
          id="sqlQuery"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          rows={5}
          className="mt-2 w-full font-mono text-sm rounded-md border border-gray-300 bg-gray-50 focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>

      <Button
        onClick={executeQuery}
        disabled={isQuerying || !sqlQuery.trim()}
        className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-150"
      >
        {isQuerying && <Loader2 className="h-4 w-4 animate-spin" />}
        Execute Query
      </Button>

      <div className="text-sm text-gray-700 border-t pt-4">
        <p className="font-semibold mb-2">Example queries:</p>
        <ul className="space-y-1 text-xs font-mono text-gray-600 pl-3 list-disc">
          <li>SELECT * FROM patients WHERE gender = 'Female';</li>
          <li>SELECT COUNT(*) FROM patients;</li>
          <li>SELECT * FROM patients WHERE first_name LIKE 'John%';</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);
