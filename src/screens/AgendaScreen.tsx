import { useState } from "react";
import { CalendarView } from "../components/CalendarView";

export default function AgendaScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda</h1>
      <CalendarView onSelectDate={setSelectedDate} />
      <div className="mt-4">Consultas para {selectedDate.toLocaleDateString()}... (implementar listagem)</div>
      <button className="mt-4 p-2 bg-green-600 text-white rounded">Nova Consulta</button>
    </div>
  );
}
