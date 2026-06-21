import { useState, useEffect } from "react";
import { api } from "../services/api";
import { FinanceSummaryCard } from "../components/FinanceSummaryCard";
import { TransactionList } from "../components/TransactionList";
import { Plus, Wallet, ShoppingBag, BarChart3, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function FinanceScreen() {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFinanceData() {
      try {
        const [sumRes, transRes] = await Promise.all([
          api.getFinanceSummary(),
          api.getFinanceTransactions()
        ]);
        setSummary(sumRes);
        setTransactions(transRes);
      } catch (error) {
        console.error("Finance error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFinanceData();
  }, []);

  const formatCurrency = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-500">Gestão de receitas, despesas e faturamento</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/financeiro/pacotes"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-emerald-200 text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm"
          >
            <ShoppingBag size={18} />
            Gerenciar Pacotes
          </Link>
          <Link 
            to="/financeiro/lancamento"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            <Plus size={20} />
            Novo Lançamento
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FinanceSummaryCard title="Receitas Mensais" value={formatCurrency(summary.totalIncome)} type="income" />
        <FinanceSummaryCard title="Despesas Mensais" value={formatCurrency(summary.totalExpense)} type="expense" />
        <FinanceSummaryCard title="Saldo Atual" value={formatCurrency(summary.balance)} type="balance" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Últimos Lançamentos</h2>
            <Link to="/financeiro/relatorios" className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
              Ver Relatório Completo <ChevronRight size={16} />
            </Link>
          </div>
          <TransactionList transactions={transactions} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-emerald-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 -mr-10 -mt-10 rounded-full" />
            <h3 className="text-lg font-bold mb-4 relative z-10 flex items-center gap-2">
              <BarChart3 size={20} /> Desempenho
            </h3>
            <p className="text-emerald-100 text-sm mb-6 relative z-10">
              Seu faturamento este mês cresceu 12% em relação ao mês anterior.
            </p>
            <div className="h-2 w-full bg-emerald-800 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-emerald-400 w-[70%]" />
            </div>
            <p className="text-[10px] text-emerald-300 mt-2 uppercase font-bold tracking-widest">Meta Mensal: 70%</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Meios de Pagamento</h3>
            <div className="space-y-4">
              {['Pix', 'Cartão de Crédito', 'Dinheiro'].map(method => (
                <div key={method} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">{method}</span>
                  <span className="h-px flex-1 mx-4 bg-gray-50" />
                  <span className="font-black text-gray-900">
                    {method === 'Pix' ? '65%' : method === 'Dinheiro' ? '10%' : '25%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

