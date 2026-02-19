import { api } from './clientApi'; // --> Conexão  do axios para fazer as requisições HTTP com o backend
import type { Pessoa } from '../models/pessoaModel';
import type { Result } from '../models/resultModel';

// API Pessoa - criação do objeto com todos os métodos CRUD presente no backend (a aplicação não utiliza todos)

export const PessoaAPI = {
    getAll: async (): Promise<Pessoa[]> => {
        const response = await api.get<Result<Pessoa[]>>('/pessoa');
        return response.data.item || [];
    },

    getById: async (id: number): Promise<Pessoa | null> => {
        const response = await api.get<Result<Pessoa>>(`/pessoa/${id}`);
        return response.data.item || null;
    },

    create: async (pessoa: Omit<Pessoa, 'id'>): Promise<number> => { 
        const response = await api.post<Result<number>>('/pessoa', pessoa);
        return response.data.item ?? 0;
    },

    update: async (id: number, pessoa: Pessoa): Promise<number> => {  
        const response = await api.put<Result<number>>(`/pessoa/${id}`, {
            ...pessoa,
            id  
        });
        return response.data.item ?? 0;
    },

    delete: async (id: number): Promise<number> => {
        const response = await api.delete<Result<number>>(`/pessoa/${id}`);
        return response.data.item ?? 0;
    }
};