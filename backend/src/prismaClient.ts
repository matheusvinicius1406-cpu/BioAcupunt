import { PrismaClient } from "@prisma/client";

// Local InMemory Data Store for fallbacks
const memoryDB = {
  patients: [
    {
      id: "p1",
      name: "Maria Souza Silva",
      birthDate: new Date("1985-04-12T00:00:00.000Z"),
      sex: "Feminino",
      profession: "Arquiteta",
      phone: "(11) 98765-4321",
      email: "maria.souza@email.com",
      anamnese: {
        principalComplaint: "Dores de cabeça constantes e insônia severa há 3 meses devido ao estresse no trabalho.",
        history: "Apresenta irritabilidade frequente, olhos secos, digestão lenta com distensão abdominal após as refeições.",
        pulse: "Tenso (Xian) e rápido",
        tongue: "Vermelha nas bordas, saburra amarela e fina",
        diagnosisTCM: "Estagnação de Qi do Fígado com ascensão de Yang do Fígado.",
        treatmentPlan: "Pacificar o Fígado, dispersar o Yang excedente e acalmar o Shen."
      },
      diagnosisHistory: [],
      balance: 150.0,
      createdAt: new Date("2026-05-10T12:00:00.000Z"),
      updatedAt: new Date("2026-06-18T14:30:00.000Z"),
    },
    {
      id: "p2",
      name: "João Alencar Ribeiro",
      birthDate: new Date("1972-11-23T00:00:00.000Z"),
      sex: "Masculino",
      profession: "Engenheiro Civil",
      phone: "(21) 99123-4567",
      email: "joao.alencar@email.com",
      anamnese: {
        principalComplaint: "Lombalgia crônica que irradia para o membro inferior esquerdo, piora ao frio.",
        history: "Refere cansaço extremo, aversão ao frio, urina clara e frequente à noite.",
        pulse: "Fraco (Ruoru) e profundo (Chen), principalmente na posição Chi.",
        tongue: "Pálida, úmida e com marcas dentárias nas laterais",
        diagnosisTCM: "Deficiência de Yang do Rim acompanhada de obstrução por frio-umidade (Síndrome Bi).",
        treatmentPlan: "Aquecer o Yang do Rim, dispersar o frio-umidade e fortalecer a região lombar."
      },
      diagnosisHistory: [],
      balance: 0.0,
      createdAt: new Date("2026-05-15T10:00:00.000Z"),
      updatedAt: new Date("2026-06-19T11:00:00.000Z"),
    },
    {
      id: "p3",
      name: "Ana Beatriz Ramos",
      birthDate: new Date("1993-08-05T00:00:00.000Z"),
      sex: "Feminino",
      profession: "Designer",
      phone: "(11) 97765-1122",
      email: "ana.beatriz@email.com",
      anamnese: {
        principalComplaint: "Ansiedade generalizada, palpitações esporádicas e fadiga física intensa.",
        history: "Sono agitado com muitos pesadelos, tonturas ocasionais e unhas fracas.",
        pulse: "Fino (Xi) e fraco (Ruo)",
        tongue: "Pálida com saburra fina e esbranquiçada",
        diagnosisTCM: "Deficiência de Qi e Sangue do Coração.",
        treatmentPlan: "Tonificar o Qi, nutrir o Sangue e tranquilizar o Shen."
      },
      diagnosisHistory: [],
      balance: 300.0,
      createdAt: new Date("2026-06-01T09:00:00.000Z"),
      updatedAt: new Date("2026-06-20T16:00:00.000Z"),
    }
  ],

  appointments: [
    {
      id: "a1",
      patientId: "p1",
      date: new Date(new Date().setHours(14, 0, 0, 0)), // Today 14:00
      duration: 50,
      status: "scheduled",
      treatmentType: "Acupuntura Sistêmica",
      notes: "Foco nos pontos IG4, F3, VB20 e Yintang para controle de cefaleia.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a2",
      patientId: "p2",
      date: new Date(new Date().setHours(16, 30, 0, 0)), // Today 16:30
      duration: 50,
      status: "scheduled",
      treatmentType: "Acupuntura + Moxabustão",
      notes: "Aplicação de moxa no canal de bexiga (B23, B40) e R3.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a3",
      patientId: "p3",
      date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday
      duration: 50,
      status: "completed",
      treatmentType: "Acupuntura Sistêmica",
      notes: "Sessão tranquila. Paciente refere melhora na qualidade de sono.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],

  finances: [
    {
      id: "f1",
      type: "receita",
      description: "Consulta Maria Souza Silva",
      amount: 150.0,
      date: new Date("2026-06-18T14:30:00.000Z"),
      category: "Sessão Individual",
      paymentMethod: "pix",
      patientId: "p1",
      notes: "PIX direto.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f2",
      type: "receita",
      description: "Pacote 10 Sessões - Ana Ramos",
      amount: 1200.0,
      date: new Date("2026-06-20T10:00:00.000Z"),
      category: "Pacote Tratamento",
      paymentMethod: "cartao_credito",
      patientId: "p3",
      notes: "Parcelado em 3x.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f3",
      type: "despesa",
      description: "Agulhas DongBang 0.25x30mm",
      amount: 85.0,
      date: new Date("2026-06-15T12:00:00.000Z"),
      category: "Materiais Clínicos",
      paymentMethod: "pix",
      notes: "Compra de 5 caixas.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],

  packages: [
    {
      id: "pkg1",
      name: "Equilíbrio Total",
      description: "Tratamento integrativo com 5 sessões de acupuntura e reavaliação continuada.",
      totalSessions: 5,
      price: 650.0,
      discount: 10,
      validityDays: 90,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "pkg2",
      name: "Revitalizar MTC",
      description: "Sessões combinadas com Moxabustão e Ventosa de acordo com a queixa clínica.",
      totalSessions: 10,
      price: 1200.0,
      discount: 15,
      validityDays: 180,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],

  packageSessions: [] as any[],

  synergies: [
    {
      id: "syn1",
      title: "Clínico: Harmonização de Fígado e Baço",
      description: "Protocolo terapêutico clássico na desarmonia gastrointestinal desencadeada por estresse.",
      procedure: "Tonificação e Dispersão Simultânea",
      category: "Clínica",
      mainPoints: ["F3", "BP6", "E36", "VB34"],
      rationale: "F3 acalma e espalha o Qi do Fígado Estagnado, enquanto BP6 e E36 tonificam o Qi do Baço auxiliando na digestão. VB34 beneficia os tendões e move o Qi lateral do corpo.",
      precautions: "Evitar estímulos excessivos em gestantes devido à forte indução de Qi no ponto BP6.",
      steps: ["1. Higienize os pontos bilateralmente com álcool 70%", "2. Agulhe F3 em dispersão leve (sentido anti-horário)", "3. Agulhe E36 e BP6 em tonificação suave", "4. Aguarde de 20 a 25 minutos estimulando a cada 10 minutos."],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "syn2",
      title: "Insônia e Ansiedade Severa",
      description: "Sedação do espírito (Shen) e pacificação mental de efeito imediato.",
      procedure: "Sedação e Ventilação de Calor do Coração",
      category: "Calmante",
      mainPoints: ["C7", "Yintang", "VG20", "CS6"],
      rationale: "Yintang e VG20 trazem serenidade mental imediata acalmando o Shen. C7 e CS6 regulam o ritmo do Coração e abrem os canais torácicos, reduzindo aperto no peito.",
      precautions: "Não realizar sedação profunda em pacientes extremamente debilitados energeticamete.",
      steps: ["1. Aplique agulhamento superficial de Yintang de cima para baixo", "2. Insira agulhas em C7 e CS6 perpendicularmente", "3. Mantenha por 30 minutos em ambiente com luz baixa e som ambiente calmo."],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],

  knowledge: [
    {
      id: "k1",
      title: "O Ponto E36 (Zusanli) e o Fortalecimento da Imunidade (Wei Qi)",
      slug: "ponto-e36-zusanli-imunidade",
      category: "Pontos Principais",
      subcategory: "Canal do Estômago",
      content: "O E36 (Zusanli) está localizado a 3 cun abaixo da patela e a 1 cun lateral da crista da tíbia. Na MTC, é conhecido como um dos pontos mais cruciais para tonificar o Qi e o Sangue, fortalecendo a energia defensiva (Wei Qi). Estudos científicos modernos comprovam que a estimulação frequente do E36 aumenta a produção de glóbulos brancos e melhora a resposta inflamatória. É indicado para fadiga, distúrbios digestivos e debilidade imunológica crônica.",
      summary: "Guia clínico e anatômico sobre a relevância terapêutica de Zusanli.",
      tags: ["Imunidade", "Fortalecimento", "Estômago"],
      references: ["Classic of Difficulties (Nan Jing)", "Journal of Acupuncture Research, 2024"],
      images: [],
      videoUrl: "",
      metadata: {},
      isActive: true,
      viewCount: 142,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "k2",
      title: "Tratamento da Estagnação de Qi do Fígado",
      slug: "tratamento-estagnacao-qi-figado",
      category: "Síndromes Clínicas",
      subcategory: "Fígado",
      content: "O Fígado (Gans) é responsável por assegurar o livre fluxo de Qi por todo o corpo. Quando este fluxo é interrompido por perturbações emocionais (como estresse, raiva ou frustração), instala-se o quadro de Estagnação de Qi do Fígado. Sintomas comuns incluem opressão torácica, irritabilidade, TPM acentuada e cefaleia temporal. Pontos fundamentais de tratamento incluem F3 (Taichong), VB34 (Yanglingquan) e IG4 (Hegu) para abrir a circulação energética geral.",
      summary: "Diagnóstico e combinação de pontos essenciais para acalmar o Fígado.",
      tags: ["Fígado", "Estresse", "Ansiedade"],
      references: ["Golden Mirror of Medicine", "Principles of Chinese Medicine"],
      images: [],
      videoUrl: "",
      metadata: {},
      isActive: true,
      viewCount: 98,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],

  knowledgeCategories: [
    { id: "c1", name: "Pontos Principais", description: "Pontos essenciais de acupuntura e seus canais", icon: "Sparkles", order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { id: "c2", name: "Síndromes Clínicas", description: "Padrões de desequilíbrios MTC e tratamentos", icon: "ClipboardList", order: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() }
  ]
};

// Introspect helper to check if real database is connected/working
const realPrisma = new PrismaClient();
let isPrismaUp = false;

// Check database connection and handle tables gracefully
async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL variable is not set. BioAcupunt Server starting in HIGH-FIDELITY OFFLINE MEMORY MODE.");
    isPrismaUp = false;
    return;
  }
  try {
    // Probe database using a simple and fast count query
    await realPrisma.patient.count();
    isPrismaUp = true;
    console.log("DATABASE connected successfully! BioAcupunt Server is running in LIVE DATABASE MODE.");
  } catch (err: any) {
    console.error("DATABASE connection check failed:", err.message);
    console.warn("BioAcupunt Server starting in HIGH-FIDELITY OFFLINE MEMORY MODE.");
    isPrismaUp = false;
  }
}

// Running check
checkDatabaseConnection();

// Create Proxy to divert queries if Database goes offline
const serviceWrapper = (modelName: string) => {
  return new Proxy({}, {
    get: (target: any, prop: string) => {
      return async (...args: any[]) => {
        // Attempt live database query if Prisma is up
        if (isPrismaUp) {
          try {
            const model = (realPrisma as any)[modelName];
            if (model && typeof model[prop] === 'function') {
              return await model[prop](...args);
            }
          } catch (err: any) {
            console.error(`Database errored during prisma.${modelName}.${prop}. Falling back to Memory DB. Error:`, err.message);
            // Switch to offline memory mode to prevent future crashes
            isPrismaUp = false;
          }
        }

        // --- Memory DB Fallback Engine ---
        console.log(`[InMemory DB Query] executing ${modelName}.${prop}`);
        const list = (memoryDB as any)[modelName === 'packageSession' ? 'packageSessions' : modelName === 'knowledgeCategory' ? 'knowledgeCategories' : modelName === 'patients' ? 'patients' : modelName + 's'];
        if (!list) {
          return null;
        }

        switch (prop) {
          case 'findMany': {
            const queryArg = args[0] || {};
            let filtered = [...list];

            // Apply simplistic filtering
            if (queryArg.where) {
              const where = queryArg.where;
              Object.keys(where).forEach(key => {
                const val = where[key];
                if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                  filtered = filtered.filter(item => item[key] === val);
                }
              });
            }

            // Apply mock includes
            if (queryArg.include) {
              filtered = filtered.map(item => {
                const copy = { ...item };
                if (queryArg.include.patient && copy.patientId) {
                  copy.patient = memoryDB.patients.find(p => p.id === copy.patientId);
                }
                if (queryArg.include.sessions && modelName === 'package') {
                  copy.sessions = memoryDB.packageSessions.filter(s => s.packageId === copy.id);
                }
                return copy;
              });
            }

            // Apply basic sorting
            if (queryArg.orderBy) {
              const orderBy = queryArg.orderBy;
              const sortKey = Object.keys(orderBy)[0];
              const sortDir = orderBy[sortKey];

              filtered.sort((a, b) => {
                if (a[sortKey] < b[sortKey]) return sortDir === 'asc' ? -1 : 1;
                if (a[sortKey] > b[sortKey]) return sortDir === 'asc' ? 1 : -1;
                return 0;
              });
            }

            return filtered;
          }

          case 'findUnique': {
            const queryArg = args[0] || {};
            const id = queryArg.where?.id;
            const slug = queryArg.where?.slug;
            
            let item = list.find(item => item.id === id || (slug && item.slug === slug));
            if (!item) return null;

            item = { ...item };
            if (queryArg.include) {
              if (queryArg.include.patient && item.patientId) {
                item.patient = memoryDB.patients.find(p => p.id === item.patientId);
              }
              if (queryArg.include.sessions && modelName === 'package') {
                item.sessions = memoryDB.packageSessions.filter(s => s.packageId === item.id);
              }
            }
            return item;
          }

          case 'create': {
            const queryArg = args[0] || {};
            const data = queryArg.data;
            const newItem = {
              id: `${modelName.charAt(0)}m_${Math.random().toString(36).substr(2, 9)}`,
              ...data,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            list.push(newItem);
            return newItem;
          }

          case 'update': {
            const queryArg = args[0] || {};
            const id = queryArg.where?.id;
            const data = queryArg.data;
            
            const idx = list.findIndex(item => item.id === id);
            if (idx === -1) throw new Error(`${modelName} not found with id: ${id}`);
            
            // Shallow merge data
            const updatedItem = {
              ...list[idx],
              ...data,
              updatedAt: new Date()
            };
            list[idx] = updatedItem;
            return updatedItem;
          }

          case 'delete': {
            const queryArg = args[0] || {};
            const id = queryArg.where?.id;
            
            const idx = list.findIndex(item => item.id === id);
            if (idx === -1) throw new Error(`${modelName} not found with id: ${id}`);
            
            const deleted = list[idx];
            list.splice(idx, 1);
            return deleted;
          }

          case 'count': {
            return list.length;
          }

          default:
            console.warn(`[InMemory DB Query] Property ${prop} is not fully simulated.`);
            return null;
        }
      };
    }
  });
};

export const prisma = new Proxy({}, {
  get: (target, prop: string) => {
    // Intercept database model access and wrap with recovery logic
    if (typeof prop === 'string' && prop !== '$disconnect' && prop !== '$connect') {
      return serviceWrapper(prop);
    }
    return (realPrisma as any)[prop];
  }
}) as unknown as PrismaClient;
