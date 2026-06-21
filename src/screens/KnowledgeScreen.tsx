import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Search, BookOpen, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function KnowledgeScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getKnowledge(), api.getCategories()])
      .then(([knowledge, cats]) => {
        setItems(knowledge);
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/conhecimento/busca?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Base de Conhecimento</h1>
        <p className="text-emerald-700">Explore materiais, protocolos e estudos sobre acupuntura e medicina tradicional chinesa.</p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-10">
        <input
          type="text"
          placeholder="Pesquisar por tema, ponto ou sintoma..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-emerald-500 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={24} />
      </form>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <Tag size={20} /> Categorias
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id || cat}
              to={`/conhecimento/categoria/${cat.name || cat}`}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-200 transition-colors">
                <BookOpen size={24} className="text-emerald-600" />
              </div>
              <span className="font-medium text-emerald-900">{cat.name || cat}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">Destaques recentes</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-xl shadow-sm" />)}
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-emerald-50"
              >
                <Link to={`/conhecimento/${item.id}`} className="flex justify-between items-center group">
                  <div>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-1 text-sm mt-1">
                      {item.summary || item.content?.substring(0, 100)}...
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-emerald-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
