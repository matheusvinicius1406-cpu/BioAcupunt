export function FinanceSummaryCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
