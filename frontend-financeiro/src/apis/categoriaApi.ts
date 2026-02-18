import { api } from './clientApi';
import type { Categoria } from '../models/categoriaModel';
import type { Result } from '../models/resultModel';

export const CategoriaAPI = {
    getAll: async (): Promise<Categoria[]> => {
        const response = await api.get<Result<Categoria[]>>('/categoria');
        return response.data.item || [];
    },

    create: async (categoria: Categoria): Promise<number> => {
        const response = await api.post<Result<number>>('/categoria', categoria);
        return response.data.item ?? 0;
    },

    update: async (id: number, categoria: Categoria): Promise<number> => {
        const response = await api.put<Result<number>>(`/categoria/${id}`, {
            ...categoria,
            id
        });
        return response.data.item ?? 0;
    },

    delete: async (id: number): Promise<number> => {
        const response = await api.delete<Result<number>>(`/categoria/${id}`);
        return response.data.item ?? 0;
    }
};