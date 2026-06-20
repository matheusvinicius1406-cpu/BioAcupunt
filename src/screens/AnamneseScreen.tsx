import { useState } from "react";
import { MeridianSelector } from "../components/MeridianSelector";
import { EVASlider } from "../components/EVASlider";
import { SignaturePad } from "../components/SignaturePad";

export default function AnamneseScreen({ patientId }: { patientId: string }) {
  const [anamnese, setAnamnese] = useState({ pulsologia: {}, eva: 0 });

  const save = async () => {
    await fetch(`/api/patients/${patientId}/anamnese`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anamnese),
    });
    alert("Prontuário salvo!");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Ficha de Anamnese</h1>
      <div className="border p-4 rounded">
        <h2>Pulsologia</h2>
        {/* Simplified inputs for example */}
        <input placeholder="Proximal" className="block w-full border p-1" />
      </div>
      <MeridianSelector values={{}} onChange={() => {}} />
      <EVASlider value={anamnese.eva} onChange={(v) => setAnamnese({...anamnese, eva: v})} />
      <SignaturePad onSave={(data) => console.log(data)} />
      <button onClick={save} className="w-full bg-blue-600 text-white p-2 rounded">Salvar Prontuário</button>
      <button onClick={async () => {
        const res = await fetch(`/api/chat/diagnose/${patientId}`, { method: 'POST' });
        const diag = await res.json();
        alert(JSON.stringify(diag));
      }} className="w-full bg-purple-600 text-white p-2 rounded">Gerar Diagnóstico IA</button>
    </div>
  );
}
