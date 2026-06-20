import { FinanceSummaryCard } from "../components/FinanceSummaryCard";
import { TransactionList } from "../components/TransactionList";

export default function FinanceScreen() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financeiro</h1>
      <div className="grid grid-cols-2 gap-4">
        <FinanceSummaryCard title="Receitas" value="R$ 0,00" />
        <FinanceSummaryCard title="Despesas" value="R$ 0,00" />
      </div>
      <h2 className="mt-4 font-bold">Lançamentos</h2>
      <TransactionList transactions={[]} />
    </div>
  );
}
