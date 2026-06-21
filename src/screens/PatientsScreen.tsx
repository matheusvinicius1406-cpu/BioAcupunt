import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { Search, UserPlus, Phone, Mail, ChevronRight, User } from "lucide-react";
import { motion } from "motion/react";

export default function PatientsScreen() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await api.getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cpf?.includes(search)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-500">Gestão e acompanhamento de prontuários</p>
        </div>
        <Link 
          to="/pacientes/novo"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
        >
          <UserPlus size={20} />
          Novo Paciente
        </Link>
      </header>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-emerald-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-44 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <User size={48} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Nenhum paciente encontrado</h3>
          <p className="text-gray-500">Inicie cadastrando um novo paciente no sistema.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl uppercase">
                  {p.name.charAt(0)}
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/pacientes/avaliacao/${p.id}`}
                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Avaliação Rápida"
                  >
                    <ClipboardList size={18} />
                  </Link>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                {p.name}
              </h3>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  {p.phone || "Não informado"}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Mail size={14} className="text-gray-400" />
                  {p.email || "Não informado"}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <Link 
                  to={`/anamnese/${p.id}`}
                  className="text-sm font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Ver Prontuário
                </Link>
                <Link 
                  to={`/pacientes/editar/${p.id}`}
                  className="text-gray-300 group-hover:text-emerald-500 transition-colors"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

import { ClipboardList } from "lucide-react";

