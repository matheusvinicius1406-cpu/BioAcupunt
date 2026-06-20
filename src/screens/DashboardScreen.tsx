import { useState } from "react";

export default function DashboardScreen() {
  const [inactivePatients] = useState([]); // Implement fetch later
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {inactivePatients.length > 0 && <div className="p-4 bg-yellow-100 text-yellow-800 rounded">Alert: Inactive patients!</div>}
    </div>
  );
}
