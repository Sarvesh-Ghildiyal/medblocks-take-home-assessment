import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Users, Database, UserPlus } from "lucide-react";

const Index = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT * FROM patients ORDER BY created_at DESC;"
  );
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    medicalHistory: "",
  });

  // Input change handler for controlled form inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Dummy submit handler that just shows success toast and resets form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsRegistering(true);
    try {
      // Simulate success action (no actual database interaction)
      toast.success("Patient registered successfully");

      // Reset form
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

      // Optionally reset patient list or query results here if needed
    } catch (error) {
      toast.error("Failed to register patient");
    } finally {
      setIsRegistering(false);
    }
  };

  // Dummy executeQuery to simulate query execution with no backend
  const executeQuery = async () => {
    if (!sqlQuery.trim()) return;

    setIsQuerying(true);
    try {
      // Just simulate empty or dummy data return here
      const results = []; // No actual query
      setQueryResults(results);
      toast.success(
        `Query executed successfully. Returned ${results.length} rows`
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to execute query"
      );
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
                {isQuerying && <Loader2 className="animate-spin h-4 w-4" />}
                Execute Query
              </Button>

              {/* Results Table */}
              <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-md bg-white">
                {queryResults.length === 0 ? (
                  <p className="p-4 text-center text-gray-500">
                    No results to display.
                  </p>
                ) : (
                  <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        {Object.keys(queryResults[0]).map((col) => (
                          <th
                            key={col}
                            className="border border-gray-300 px-3 py-1 text-left text-sm font-medium"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResults.map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          {Object.values(row).map((val, idx) => (
                            <td
                              key={idx}
                              className="border border-gray-300 px-3 py-1 text-sm"
                            >
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
