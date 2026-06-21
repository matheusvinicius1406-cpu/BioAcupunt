import { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  ChevronRight,
  Plus,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function DashboardScreen() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    monthlyIncome: 0,
    nextAppointment: null as any
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const patients = await api.getPatients();
        const appointments = await api.getAppointments({ date: new Date().toISOString().split('T')[0] });
        const finance = await api.getFinanceSummary({ period: 'month' });
        
        setStats({
          totalPatients: patients.length,
          appointmentsToday: appointments.length,
          monthlyIncome: finance.totalIncome || 0,
          nextAppointment: appointments[0] || null
        });
      } catch (error) {
        console.error("Erro dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const cards = [
    { label: 'Pacientes Ativos', value: stats.totalPatients, icon: Users, color: 'bg-blue-500', link: '/pacientes' },
    { label: 'Consultas Hoje', value: stats.appointmentsToday, icon: Calendar, color: 'bg-emerald-500', link: '/agenda' },
    { label: 'Faturamento Mensal', value: `R$ ${stats.monthlyIncome.toLocaleString('pt-BR')}`, icon: TrendingUp, color: 'bg-amber-500', link: '/financeiro' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Olá, Dra. Camila</h1>
        <p className="text-gray-500 mt-1">Aqui está o resumo do seu dia na BioAcupunt.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {cards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-5 -mr-8 -mt-8 rounded-full`} />
            <div className={`${card.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4`}>
              <card.icon size={24} />
            </div>
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            <Link to={card.link} className="absolute inset-0" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Próximo Atendimento */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Próximo Atendimento</h2>
            <Link to="/agenda" className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
              Ver Agenda <ChevronRight size={16} />
            </Link>
          </div>

          {stats.nextAppointment ? (
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold text-lg shadow-sm">
                {stats.nextAppointment.patient?.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{stats.nextAppointment.patient?.name}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-emerald-700">
                  <span className="flex items-center gap-1"><Clock size={14} /> {stats.nextAppointment.time}</span>
                  <span className="h-1 w-1 bg-emerald-200 rounded-full" />
                  <span>Acupuntura Sistêmica</span>
                </div>
              </div>
              <Link 
                to={`/anamnese/${stats.nextAppointment.patientId}`}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-colors"
              >
                Atender
              </Link>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Calendar size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">Sem consultas agendadas para hoje.</p>
            </div>
          )}
        </section>

        {/* Links Rápidos */}
        <section className="bg-emerald-900 p-8 rounded-3xl shadow-xl text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 -mr-20 -mt-20 rounded-full blur-3xl" />
          <h2 className="text-xl font-bold mb-6 relative z-10">Acesso Rápido</h2>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <Link to="/pacientes/novo" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors flex flex-col gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Plus size={20} />
              </div>
              <span className="font-bold text-sm">Novo Paciente</span>
            </Link>
            <Link to="/chat" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors flex flex-col gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <span className="font-bold text-sm">Consultar IA</span>
            </Link>
            <Link to="/conhecimento" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors flex flex-col gap-2 text-left">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <span className="font-bold text-sm">Protocolos</span>
            </Link>
            <Link to="/financeiro/lancamento" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors flex flex-col gap-2 text-left">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <span className="font-bold text-sm">Novo Lançamento</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

