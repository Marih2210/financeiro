import { api } from './clientApi';
import type { Transacao } from '../models/transacoesModel';
import type { Result } from '../models/resultModel';

export const TransacoesAPI = {
    getAll: async (): Promise<Transacao[]> => {
        const response = await api.get<Result<Transacao[]>>('/transacoes');
        return response.data.item || [];
    },

    getById: async (id: number): Promise<Transacao | null> => {
        const response = await api.get<Result<Transacao>>(`/transacoes/${id}`);
        return response.data.item || null;
    },

    getByPessoa: async (pessoaId: number): Promise<Transacao[]> => {
        const response = await api.get<Result<Transacao[]>>(`/transacoes/pessoa/${pessoaId}`);
        return response.data.item || [];
    },

    getByCategoria: async (categoriaId: number): Promise<Transacao[]> => {
        const response = await api.get<Result<Transacao[]>>(`/transacoes/categoria/${categoriaId}`);
        return response.data.item || [];
    },

    create: async (transacao: Transacao): Promise<number> => {
        const response = await api.post<Result<number>>('/transacoes', transacao);
        return response.data.item ?? 0;
    },

    update: async (id: number, transacao: Transacao): Promise<number> => {
        const response = await api.put<Result<number>>(`/transacoes/${id}`, {
            ...transacao,
            id
        });
        return response.data.item ?? 0;
    },

    delete: async (id: number): Promise<number> => {
        const response = await api.delete<Result<number>>(`/transacoes/${id}`);
        return response.data.item ?? 0;
    }
};