import { prisma } from "../prismaClient";

export const appointmentService = {
  getAll: async (filters: any) => await prisma.appointment.findMany({ where: filters, include: { patient: true }, orderBy: { date: 'asc' } }),
  getById: async (id: string) => await prisma.appointment.findUnique({ where: { id }, include: { patient: true } }),
  create: async (data: any) => await prisma.appointment.create({ data }),
  update: async (id: string, data: any) => await prisma.appointment.update({ where: { id }, data }),
  delete: async (id: string) => await prisma.appointment.delete({ where: { id } }),
  getByPatient: async (patientId: string) => await prisma.appointment.findMany({ where: { patientId }, orderBy: { date: 'desc' } }),
  getInactivePatients: async () => await prisma.patient.findMany({
    where: {
      appointments: { every: { date: { lt: new Date(new Date().setDate(new Date().getDate() - 30)) } } }
    }
  })
};
