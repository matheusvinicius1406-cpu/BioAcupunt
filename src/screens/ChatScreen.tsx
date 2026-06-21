import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from 'react-markdown';

export default function ChatScreen() {
  const { patientId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await api.chat(currentInput, patientId, messages);
      setMessages(prev => [...prev, { role: "assistant", text: response.response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", text: "Desculpe, tive um problema ao processar sua solicitação." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-emerald-500" /> Inteligência BioAcupunt
          </h1>
          <p className="text-gray-500">Assistente especializado em Medicina Tradicional Chinesa</p>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <Bot size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Como posso ajudar hoje?</h3>
              <p className="text-gray-500 max-w-xs">
                Você pode perguntar sobre protocolos, localização de pontos ou pedir auxílio em um diagnóstico.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                  m.role === "user" ? "bg-gray-100 text-gray-600" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-3xl ${
                  m.role === "user" 
                    ? "bg-emerald-600 text-white rounded-tr-none" 
                    : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
                }`}>
                  <div className="prose prose-sm max-w-none prose-invert">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Bot size={16} />
                </div>
                <div className="p-4 bg-gray-50 rounded-3xl rounded-tl-none border border-gray-100">
                  <Loader2 className="animate-spin text-emerald-600" size={18} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <form onSubmit={sendMessage} className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida clínica..."
              className="w-full pl-6 pr-14 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            A IA pode cometer erros. Verifique informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}

