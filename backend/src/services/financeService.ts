import { prisma } from "../prismaClient";

export const financeService = {
  getAll: async (filters: any) => await prisma.finance.findMany({ where: filters, orderBy: { date: 'desc' } }),
  create: async (data: any) => await prisma.finance.create({ data }),
  getById: async (id: string) => await prisma.finance.findUnique({ where: { id } }),
  update: async (id: string, data: any) => await prisma.finance.update({ where: { id }, data }),
  delete: async (id: string) => await prisma.finance.delete({ where: { id: id } }),
  getSummary: async () => {
    const list = await prisma.finance.findMany();
    const income = list
      .filter(t => t.type === 'RECEITA')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    const expense = list
      .filter(t => t.type === 'DESPESA')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    };
  },
  getMonthlyReport: async (year: number, month: number) => await prisma.finance.findMany({ 
    where: { date: { gte: new Date(year, month, 1), lt: new Date(year, month + 1, 1) } } 
  }),
};
