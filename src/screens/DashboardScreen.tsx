import { useState } from "react";

export default function DashboardScreen() {
  const [data] = useState({ inactivePatients: [], recentDiagnosis: null });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {data.recentDiagnosis && <div className="p-4 bg-blue-100 rounded mt-4">Último Diagnóstico IA gerado.</div>}
    </div>
  );
}
