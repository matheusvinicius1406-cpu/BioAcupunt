import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { MeridianSelector } from "../components/MeridianSelector";
import { EVASlider } from "../components/EVASlider";
import { SignaturePad } from "../components/SignaturePad";
import { 
  Save, 
  Sparkles, 
  Activity, 
  FileText, 
  Brain, 
  MessageCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: 'identificacao', label: 'Queixa & EVA', icon: FileText },
  { id: 'pulsologia', label: 'Pulsos & Língua', icon: Activity },
  { id: 'meridianos', label: 'Meridianos', icon: Brain },
  { id: 'fechamento', label: 'Assinatura', icon: CheckCircle2 }
];

export default function AnamneseScreen() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('identificacao');
  const [anamnese, setAnamnese] = useState<any>({ 
    queixaPrincipal: '',
    observacoes: '',
    eva: 0,
    pulsologia: {
      proximal: '', medial: '', distal: ''
    },
    lingua: {
      saburra: '', cor: '', forma: ''
    },
    meridianos: {}
  });
  const [saving, setSaving] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);

  useEffect(() => {
    if (patientId) {
      api.getPatient(patientId).then(setPatient);
      api.getAnamnese(patientId).then(data => {
        if (data) setAnamnese(prev => ({ ...prev, ...data }));
      });
    }
  }, [patientId]);

  const handleSave = async () => {
    if (!patientId) return;
    setSaving(true);
    try {
      await api.updateAnamnese(patientId, anamnese);
      // Sucesso
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDiagnose = async () => {
    if (!patientId) return;
    setDiagnosing(true);
    try {
      await api.diagnose(patientId);
      navigate(`/tratamento/${patientId}`);
    } catch (error) {
      console.error("Erro diagnóstico:", error);
    } finally {
      setDiagnosing(false);
    }
  };

  const nextTab = () => {
    const idx = tabs.findIndex(t => t.id === activeTab);
    if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
  };

  const prevTab = () => {
    const idx = tabs.findIndex(t => t.id === activeTab);
    if (idx > 0) setActiveTab(tabs[idx - 1].id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-emerald-50 rounded-full text-emerald-700">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Atendimento</h1>
            <p className="text-emerald-700 font-medium">Prontuário de {patient?.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-emerald-200 text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm"
          >
            {saving ? <Clock className="animate-spin" size={18} /> : <Save size={18} />}
            Salvar
          </button>
          <button 
            onClick={handleDiagnose}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            {diagnosing ? <Clock className="animate-spin" size={18} /> : <Sparkles size={18} />}
            Gerar Diagnóstico IA
          </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 min-h-[600px] flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all cursor-pointer ${
                  isActive ? 'bg-white text-emerald-700 shadow-md font-bold' : 'text-gray-500 hover:bg-white/50'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              {activeTab === 'identificacao' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Queixa Principal</h3>
                    <textarea 
                      placeholder="Descreva o motivo da consulta..."
                      className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-800"
                      value={anamnese.queixaPrincipal}
                      onChange={(e) => setAnamnese({...anamnese, queixaPrincipal: e.target.value})}
                    />
                  </div>
                  <EVASlider value={anamnese.eva} onChange={(v) => setAnamnese({...anamnese, eva: v})} />
                </div>
              )}

              {activeTab === 'pulsologia' && (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity size={20} className="text-emerald-600" /> Pulsologia (Cun, Guan, Chi)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['proximal', 'medial', 'distal'].map(pos => (
                        <div key={pos}>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">{pos}</label>
                          <input 
                            placeholder="Descreva o pulso..."
                            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                            value={anamnese.pulsologia[pos]}
                            onChange={(e) => setAnamnese({
                              ...anamnese, 
                              pulsologia: { ...anamnese.pulsologia, [pos]: e.target.value }
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Inspeção da Língua</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Cor do Corpo</label>
                        <select 
                          className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                          value={anamnese.lingua.cor}
                          onChange={(e) => setAnamnese({
                            ...anamnese, 
                            lingua: { ...anamnese.lingua, cor: e.target.value }
                          })}
                        >
                          <option value="">Selecione...</option>
                          <option value="pálida">Pálida</option>
                          <option value="rósea">Rósea (Normal)</option>
                          <option value="vermelha">Vermelha</option>
                          <option value="púrpura">Púrpura</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Saburra</label>
                        <input 
                          className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                          placeholder="Ex: Branca, Amarela, Escassa..."
                          value={anamnese.lingua.saburra}
                          onChange={(e) => setAnamnese({
                            ...anamnese, 
                            lingua: { ...anamnese.lingua, saburra: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'meridianos' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Brain size={20} className="text-emerald-600" /> Balanço Energético
                  </h3>
                  <MeridianSelector 
                    values={anamnese.meridianos} 
                    onChange={(mId: string, val: any) => setAnamnese({
                      ...anamnese,
                      meridianos: { ...anamnese.meridianos, [mId]: val }
                    })} 
                  />
                </div>
              )}

              {activeTab === 'fechamento' && (
                <div className="space-y-10">
                   <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Observações Finais</h3>
                    <textarea 
                      placeholder="Conclusões ou orientações dietéticas..."
                      className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500"
                      value={anamnese.observacoes}
                      onChange={(e) => setAnamnese({...anamnese, observacoes: e.target.value})}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Assinatura do Paciente</h3>
                    <p className="text-sm text-gray-500 mb-4">Ao assinar, o paciente confirma a veracidade das informações e autoriza o tratamento.</p>
                    <SignaturePad onSave={(data) => setAnamnese({...anamnese, assinatura: data})} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <footer className="mt-auto pt-8 border-t border-gray-100 flex justify-between">
            <button 
              disabled={activeTab === tabs[0].id}
              onClick={prevTab}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-emerald-600 disabled:opacity-0 transition-all font-bold"
            >
              <ChevronLeft size={20} /> Anterior
            </button>
            <button 
              onClick={activeTab === tabs[tabs.length - 1].id ? handleSave : nextTab}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-100 transition-all"
            >
              {activeTab === tabs[tabs.length - 1].id ? 'Finalizar & Salvar' : 'Próximo'} 
              {activeTab !== tabs[tabs.length - 1].id && <ChevronRight size={20} />}
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

