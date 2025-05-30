/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Users, Database, UserPlus } from "lucide-react";
import { useAddPatient } from "@/services/queries";
import type { PatientFormData } from "@/services/types";
import { usePGlite } from "@electric-sql/pglite-react";

const Index = () => {
  // Form Submission states
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    medicalHistory: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const addPatient = useAddPatient();

  //  handleing input change of form data
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit handle
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      await addPatient(formData);
      toast.success("🎉 Patient registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        medicalHistory: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("😓 Failed to register patient. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  // Query State variable and functions
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM patients;");
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);

  const db = usePGlite();
  const executeQuery = async () => {
    setIsQuerying(true);
    try {
      const result = await db.query(sqlQuery);
      // PGlite returns rows under .rows
      setQueryResults(result.rows);
      toast.success("✅ Query executed successfully!");
    } catch (err: any) {
      console.error("Query error:", err);
      toast.error("❌ Failed to execute query. Check SQL syntax.");
      setQueryResults([]);
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Patient Management System
          </h1>
          <p className="text-gray-600">
            Register patients, query records, and manage medical data
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Registration Form */}
          <Card className="shadow-lg border border-gray-200 bg-white/90 backdrop-blur-sm rounded-xl p-0 overflow-hidden">
            <CardHeader className="bg-blue-600 text-white px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <UserPlus className="w-5 h-5" />
                Register New Patient
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* DOB + Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={2}
                  />
                </div>

                {/* Medical History */}
                <div>
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                    placeholder="Enter relevant medical history..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {isRegistering && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Register Patient
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* SQL Query Interface */}
          <Card className="rounded-xl shadow-md border p-0 border-gray-200 bg-white backdrop-blur-md">
            <CardHeader className="bg-green-600 text-white rounded-t-xl px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Database className="w-5 h-5" />
                <span>SQL Query Interface</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* SQL Textarea */}
              <div>
                <Label
                  htmlFor="sqlQuery"
                  className="text-sm font-medium text-gray-700"
                >
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

              {/* Execute Button */}
              <Button
                onClick={executeQuery}
                disabled={isQuerying || !sqlQuery.trim()}
                className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-150"
              >
                {isQuerying && <Loader2 className="h-4 w-4 animate-spin" />}
                Execute Query
              </Button>

              {/* Example Queries */}
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
        </div>

        {/* Patient Data Display */}
        <Card className="rounded-xl p-0 shadow-md border border-gray-200 bg-white backdrop-blur-md">
          <CardHeader className="bg-indigo-600 text-white rounded-t-xl px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Users className="w-5 h-5" />
              <span>SQL Query Results: Patient Records ({queryResults.length})</span>
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
      </div>
    </div>
  );
};

export default Index;
