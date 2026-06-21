import axios from 'axios';

const apiInstance = axios.create({
  baseURL: '/api',
});

export const api = {
  // Pacientes
  getPatients: (params?: any) => apiInstance.get('/patients', { params }).then(res => res.data),
  getPatient: (id: string) => apiInstance.get(`/patients/${id}`).then(res => res.data),
  createPatient: (data: any) => apiInstance.post('/patients', data).then(res => res.data),
  updatePatient: (id: string, data: any) => apiInstance.put(`/patients/${id}`, data).then(res => res.data),
  deletePatient: (id: string) => apiInstance.delete(`/patients/${id}`).then(res => res.data),
  getAnamnese: (patientId: string) => apiInstance.get(`/patients/${patientId}/anamnese`).then(res => res.data),
  updateAnamnese: (patientId: string, data: any) => apiInstance.put(`/patients/${patientId}/anamnese`, data).then(res => res.data),

  // Agenda
  getAppointments: (params?: any) => apiInstance.get('/appointments', { params }).then(res => res.data),
  createAppointment: (data: any) => apiInstance.post('/appointments', data).then(res => res.data),
  updateAppointment: (id: string, data: any) => apiInstance.put(`/appointments/${id}`, data).then(res => res.data),
  deleteAppointment: (id: string) => apiInstance.delete(`/appointments/${id}`).then(res => res.data),

  // Chat / IA
  chat: (prompt: string, patientId?: string, history?: any[], context?: string) => 
    apiInstance.post('/chat', { message: prompt, patientId, history, context }).then(res => res.data),
  diagnose: (patientId: string) => apiInstance.post(`/chat/diagnose/${patientId}`).then(res => res.data),

  // Financeiro
  getFinanceSummary: (params?: any) => apiInstance.get('/finance/summary', { params }).then(res => res.data),
  getFinanceTransactions: (params?: any) => apiInstance.get('/finance/transactions', { params }).then(res => res.data),
  createTransaction: (data: any) => apiInstance.post('/finance/transactions', data).then(res => res.data),
  getPackages: () => apiInstance.get('/packages').then(res => res.data),
  createPackage: (data: any) => apiInstance.post('/packages', data).then(res => res.data),
  sellPackage: (packageId: string, patientId: string) => apiInstance.post(`/packages/${packageId}/sell`, { patientId }).then(res => res.data),
  useSession: (sessionId: string) => apiInstance.post(`/packages/sessions/${sessionId}/use`).then(res => res.data),

  // Conhecimento
  getKnowledge: (params?: any) => apiInstance.get('/knowledge', { params }).then(res => res.data),
  getKnowledgeById: (id: string) => apiInstance.get(`/knowledge/${id}`).then(res => res.data),
  searchKnowledge: (query: string) => apiInstance.get('/knowledge/search', { params: { q: query } }).then(res => res.data),
  getCategories: () => apiInstance.get('/knowledge/categories').then(res => res.data),

  // Sinergia
  getSynergy: (params?: any) => apiInstance.get('/synergy', { params }).then(res => res.data),
  getSynergyById: (id: string) => apiInstance.get(`/synergy/${id}`).then(res => res.data),
};
