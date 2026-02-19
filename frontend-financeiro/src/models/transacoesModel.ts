// Model de transacoes

export interface Transacao {
    id?: number;
    descricao: string;
    valor: number;
    tipo: 'despesa' | 'receita';
    categoriaId: number;
    pessoaId: number;
}