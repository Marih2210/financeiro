import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransacoesAPI } from '../apis/transacoesApi';
import { PessoaAPI } from '../apis/pessoaApi';
import { CategoriaAPI } from '../apis/categoriaApi';
import { ConfirmModal } from '../components/ConfirmModal';
import type { Transacao } from '../models/transacoesModel';
import type { Pessoa } from '../models/pessoaModel';
import type { Categoria } from '../models/categoriaModel';
import '../styles/Pages.css';

export const TransacaoPage: React.FC = () => {
    const navigate = useNavigate();
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [transacaoToDelete, setTransacaoToDelete] = useState<number | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);
            const [transacoesData, pessoasData, categoriasData] = await Promise.all([
                TransacoesAPI.getAll(),
                PessoaAPI.getAll(),
                CategoriaAPI.getAll()
            ]);
            setTransacoes(transacoesData);
            setPessoas(pessoasData);
            setCategorias(categoriasData);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar dados');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id: number) => {
        setTransacaoToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleDelete = async () => {
        if (!transacaoToDelete) return;
        
        try {
            await TransacoesAPI.delete(transacaoToDelete);
            carregarDados();
        } catch (err) {
            setError('Erro ao excluir transação');
            console.error(err);
        }
    };

    const formatarValor = (valor: number) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const getNomePessoa = (pessoaId: number) => {
        const pessoa = pessoas.find(p => p.id === pessoaId);
        return pessoa?.nome || '-';
    };

    const getDescricaoCategoria = (categoriaId: number) => {
        const categoria = categorias.find(c => c.id === categoriaId);
        return categoria?.descricao || '-';
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-left">
                    <span className="page-icon">💳</span>
                    <h1 className="page-title">Transações</h1>
                </div>
                <div className="header-actions">
                    <button onClick={() => navigate('/')} className="btn-voltar">
                        ← Voltar
                    </button>
                </div>
            </header>

            {error && <div className="error-message">{error}</div>}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Excluir Transação"
                message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                type="danger"
            />

            <div className="content-card">
                <div className="table-header">
                    <h2 className="table-title">Lista de Transações</h2>
                    <span className="table-count">{transacoes.length} registro(s)</span>
                </div>

                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Tipo</th>
                                    <th>Categoria</th>
                                    <th>Pessoa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transacoes.map(transacao => (
                                    <tr key={transacao.id}>
                                        <td className="column-name">{transacao.descricao}</td>
                                        <td className={transacao.tipo === 'receita' ? 'valor-receita' : 'valor-despesa'}>
                                            {formatarValor(transacao.valor)}
                                        </td>
                                        <td>
                                            <span className={`badge badge-${transacao.tipo}`}>
                                                {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
                                            </span>
                                        </td>
                                        <td>{getDescricaoCategoria(transacao.categoriaId)}</td>
                                        <td>{getNomePessoa(transacao.pessoaId)}</td>
                                    </tr>
                                ))}
                                {transacoes.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="empty-message">
                                            Nenhuma transação cadastrada
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};