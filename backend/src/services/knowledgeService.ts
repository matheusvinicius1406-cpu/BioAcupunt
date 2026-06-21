import { prisma } from "../prismaClient";

export const knowledgeService = {
  getAll: async (filters: any) => await prisma.knowledge.findMany({ where: filters, orderBy: { createdAt: 'desc' } }),
  getById: async (id: string) => await prisma.knowledge.findUnique({ where: { id } }),
  create: async (data: any) => await prisma.knowledge.create({ data }),
  update: async (id: string, data: any) => await prisma.knowledge.update({ where: { id }, data }),
  delete: async (id: string) => await prisma.knowledge.delete({ where: { id } }),
  getCategories: async () => await prisma.knowledgeCategory.findMany(),
  search: async (query: string) => await prisma.knowledge.findMany({ 
    where: { OR: [{ title: { contains: query } }, { content: { contains: query } }] } 
  }),
  incrementView: async (id: string) => await prisma.knowledge.update({ where: { id }, data: { viewCount: { increment: 1 } } }),
};
