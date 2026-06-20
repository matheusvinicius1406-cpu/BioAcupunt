export default function TreatmentScreen({ diagnosis }: { diagnosis: any }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Diagnóstico</h1>
      <pre className="bg-gray-100 p-2 mt-2">{JSON.stringify(diagnosis, null, 2)}</pre>
    </div>
  );
}
