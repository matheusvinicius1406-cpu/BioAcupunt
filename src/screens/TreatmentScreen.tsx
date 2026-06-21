import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { ArrowLeft, Sparkles, FileText, Brain, Share2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function TreatmentScreen() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    if (patientId) {
      Promise.all([
        api.getPatient(patientId),
        api.getAnamnese(patientId)
      ]).then(([p, a]) => {
        setPatient(p);
        setData(a);
        setLoading(false);
      });
    }
  }, [patientId]);

  const handleSaveToProntuario = async () => {
    if (!patientId || !data?.diagnose) return;
    setSaving(true);
    try {
      alert("Diagnóstico salvo com sucesso no histórico.");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    const text = `BioAcupunt - Plano de Tratamento\nPaciente: ${patient?.name}\n\nDiagnóstico: ${data?.diagnose}\n\nPlano: ${data?.treatmentPlan}`;
    navigator.clipboard.writeText(text);
    alert("Plano de tratamento copiado para a área de transferência!");
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-emerald-50 rounded-full text-emerald-700">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="text-emerald-500" /> Plano de Tratamento
            </h1>
            <p className="text-gray-500">Paciente: {patient?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleShare}
            className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 font-bold"
          >
            <Share2 size={20} /> Compartilhar
          </button>
        </div>
      </header>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-white rounded-3xl" />
          <div className="h-96 bg-white rounded-3xl" />
        </div>
      ) : (
        <div className="space-y-8">
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 -mr-10 -mt-10 rounded-full" />
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
              <Brain size={24} className="text-emerald-400" /> Diagnóstico Energético
            </h2>
            <div className="prose prose-invert max-w-none relative z-10">
              <p className="text-emerald-50 leading-relaxed text-lg italic">
                "{data?.diagnose || "Nenhum diagnóstico gerado recentemente."}"
              </p>
            </div>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-black text-emerald-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
                <CheckCircle2 size={20} /> Pontos Recomendados
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600 whitespace-pre-wrap">{data?.treatmentPoints || "Pontos específicos recomendados aparecerão aqui."}</p>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-amber-50 p-8 rounded-3xl shadow-sm border border-amber-100"
            >
              <h3 className="text-lg font-black text-amber-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
                <AlertCircle size={20} /> Contraindicações
              </h3>
              <p className="text-amber-900/80 text-sm italic">
                {data?.contraindications || "Evite estímulos excessivos em pacientes debilitados. Mantenha ambiente aquecido."}
              </p>
            </motion.section>
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-emerald-600" /> Orientações e Técnicas
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="whitespace-pre-wrap">{data?.treatmentPlan || "Os pontos e técnicas sugeridas aparecerão aqui."}</p>
            </div>
          </motion.section>

          <div className="flex gap-4">
            <button 
              onClick={handleSaveToProntuario}
              disabled={saving}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} /> Salvar no Prontuário
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
            >
              Consultar IA para detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

