import { useState, useEffect } from "react";
import { CalendarView } from "../components/CalendarView";
import { api } from "../services/api";
import { Plus, Clock, User, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";

export default function AgendaScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [allAppointments, setAllAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await api.getAppointments();
      setAllAppointments(data);
    } catch (error) {
      console.error("Erro agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedStr = format(selectedDate, 'yyyy-MM-dd');
    const filtered = allAppointments.filter(app => format(new Date(app.date), 'yyyy-MM-dd') === selectedStr);
    setAppointments(filtered);
  }, [selectedDate, allAppointments]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-500">Controle de horários e sessões</p>
        </div>
        <Link 
          to="/agenda/novo"
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all hover:scale-105"
        >
          <Plus size={20} />
          Nova Consulta
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CalendarView 
            selectedDate={selectedDate} 
            onSelectDate={setSelectedDate} 
            appointments={allAppointments}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </h2>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {appointments.length} atendimentos
              </span>
            </header>

            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedDate.toString()}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {appointments.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Clock size={40} className="mx-auto text-gray-200 mb-3" />
                    <p className="text-gray-500">Nenhuma consulta para este dia.</p>
                  </div>
                ) : (
                  appointments.sort((a, b) => a.time.localeCompare(b.time)).map((app) => (
                    <Link
                      key={app.id}
                      to={`/agenda/${app.id}`}
                      className="flex items-center gap-6 p-4 rounded-2xl border border-gray-50 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group"
                    >
                      <div className="text-center min-w-[60px]">
                        <p className="text-lg font-bold text-emerald-600">{app.time}</p>
                      </div>
                      
                      <div className="h-10 w-px bg-gray-100" />
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {app.patient?.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <User size={12} /> {app.type || 'Sessão Regular'}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={20} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </Link>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

