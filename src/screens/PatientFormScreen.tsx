import { useState } from "react";

export default function PatientFormScreen() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    alert("Paciente cadastrado!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Paciente</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded w-full mb-4" placeholder="Nome do paciente" />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded">Salvar</button>
    </form>
  );
}
