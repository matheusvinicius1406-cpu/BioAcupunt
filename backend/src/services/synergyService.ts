import { prisma } from "../prismaClient";

export const synergyService = {
  getAll: async () => await prisma.synergy.findMany(),
  getByProcedure: async (procedure: string) => await prisma.synergy.findMany({ where: { procedure } }),
  getById: async (id: string) => await prisma.synergy.findUnique({ where: { id } }),
};
