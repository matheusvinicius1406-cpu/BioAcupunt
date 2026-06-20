import { useState, useEffect } from "react";

export default function PatientsScreen() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
      {patients.map((p: any) => (
        <div key={p.id} className="p-4 border rounded mb-2 shadow-sm">{p.name}</div>
      ))}
    </div>
  );
}
