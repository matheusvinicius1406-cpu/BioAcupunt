import { prisma } from "../prismaClient";

export const patientService = {
  getAll: async () => await prisma.patient.findMany({ orderBy: { createdAt: 'desc' } }),
  create: async (data: any) => await prisma.patient.create({ data }),
  getById: async (id: string) => await prisma.patient.findUnique({ where: { id } }),
  update: async (id: string, data: any) => await prisma.patient.update({ where: { id }, data }),
};
