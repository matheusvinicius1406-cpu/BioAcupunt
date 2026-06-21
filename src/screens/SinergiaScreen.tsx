import { useState, useEffect } from "react";
import { api } from "../services/api";
import { SynergyCard } from "../components/SynergyCard";
import { Sparkles, Search } from "lucide-react";
import { motion } from "motion/react";

export default function SinergiaScreen() {
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getSynergy().then(data => {
      setGuides(data);
      setLoading(false);
    });
  }, []);

  const filtered = guides.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-emerald-500" /> Sinergia Facial
        </h1>
        <p className="text-gray-500 mt-1">Protocolos de harmonização e tratamento estético MTC.</p>
      </header>

      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Buscar protocolos, óleos ou técnicas..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-emerald-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide, idx) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <SynergyCard synergy={guide} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

