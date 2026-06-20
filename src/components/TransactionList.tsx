export function TransactionList({ transactions }: { transactions: any[] }) {
  return (
    <table className="w-full text-left">
      <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th></tr></thead>
      <tbody>
        {transactions.map(t => <tr key={t.id}><td>{new Date(t.date).toLocaleDateString()}</td><td>{t.description}</td><td>R$ {t.amount}</td></tr>)}
      </tbody>
    </table>
  );
}
