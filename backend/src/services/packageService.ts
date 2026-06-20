import { prisma } from "../prismaClient";

export const packageService = {
  getAll: async () => await prisma.package.findMany({ include: { sessions: true } }),
  create: async (data: any) => await prisma.package.create({ data }),
  getById: async (id: string) => await prisma.package.findUnique({ where: { id }, include: { sessions: true } }),
  update: async (id: string, data: any) => await prisma.package.update({ where: { id }, data }),
  delete: async (id: string) => await prisma.package.delete({ where: { id: id } }),
  sell: async (data: any) => await prisma.packageSession.create({ data }),
  getSessionsByPatient: async (patientId: string) => await prisma.packageSession.findMany({ where: { patientId } }),
  useSession: async (sessionId: string) => await prisma.packageSession.update({ where: { id: sessionId }, data: { used: true, usedAt: new Date() } }),
};
