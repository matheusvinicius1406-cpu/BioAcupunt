import { useState } from "react";

export function CalendarView({ onSelectDate }: { onSelectDate: (date: Date) => void }) {
  const [currentDate] = useState(new Date());
  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="font-bold mb-2">{currentDate.toLocaleDateString()}</h3>
      <button onClick={() => onSelectDate(currentDate)} className="p-2 bg-blue-500 text-white rounded">Selecionar Hoje</button>
    </div>
  );
}
