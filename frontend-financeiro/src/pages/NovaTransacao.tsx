import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TransacoesAPI } from '../apis/transacoesApi';
import { CategoriaAPI } from '../apis/categoriaApi';
import { PessoaAPI } from '../apis/pessoaApi';  
import type { Transacao } from '../models/transacoesModel';
import type { Categoria } from '../models/categoriaModel';
import type { Pessoa } from '../models/pessoaModel';  
import '../styles/Pages.css';

// Página de Nova Transacao

type TipoTransacao = 'despesa' | 'receita';

export const NovaTransacaoPage: React.FC = () => {

    // estados e navegacao 

    const navigate = useNavigate();
    const location = useLocation();
    const pessoaId = location.state?.pessoaId || 0;

    const [pessoa, setPessoa] = useState<Pessoa | null>(null); 
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [novaTransacao, setNovaTransacao] = useState<{
        descricao: string;
        valor: number;
        tipo: TipoTransacao;
        categoriaId: number;
        pessoaId: number;
    }>({
        descricao: '',
        valor: 0,
        tipo: 'despesa',
        categoriaId: 0,
        pessoaId: pessoaId
    });

    // Carrega os dados da nova transação no init da página 

    useEffect(() => {
        carregarDados();
    }, [pessoaId]);

    useEffect(() => {
        if (pessoaId) {
            setNovaTransacao(prev => ({ ...prev, pessoaId }));
        }
    }, [pessoaId]);

    // Busca os dados da pessoa e categorias da API para associar à nova transação

    const carregarDados = async () => {
        try {
            setLoading(true);
            
            const [pessoaData, categoriasData] = await Promise.all([
                PessoaAPI.getById(pessoaId),
                CategoriaAPI.getAll()
            ]);
            
            if (!pessoaData) {
                setError('Pessoa não encontrada');
                return;
            }
            
            setPessoa(pessoaData);
            setCategorias(categoriasData);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar dados');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Método para filtrar as categorias baseado no tipo selecionado

    const categoriasFiltradas = React.useMemo(() => {
        if (!novaTransacao.tipo) return categorias;
        
        return categorias.filter(cat => 
            cat.finalidade === novaTransacao.tipo || cat.finalidade === 'ambas'
        );
    }, [categorias, novaTransacao.tipo]);

    // Cria nova transação associada ao id da pessoa

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!novaTransacao.categoriaId) {
            setError('Categoria é obrigatória');
            return;
        }

        try {
            await TransacoesAPI.create({
                ...novaTransacao,
                valor: Number(novaTransacao.valor)
            });
            
            navigate('/transacoes'); 
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao criar transação');
            console.error(err);
        }
    };

    if (!pessoaId) {
        return (
            <div className="page-container">
                <div className="error-message">
                    ID da pessoa não informado!
                </div>
                <button onClick={() => navigate('/pessoas')} className="btn-voltar">
                    ← Voltar para Pessoas
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-left">
                    <span className="page-icon">💳</span>
                    <h1 className="page-title">Nova Transação</h1>
                </div>
                <button onClick={() => navigate('/pessoas')} className="btn-voltar">
                    ← Voltar
                </button>
            </header>

            {error && <div className="error-message">{error}</div>}

            <div className="form-container">
                <h3 className="form-title">
                    Adicionar Transação para {pessoa?.nome} (ID: {pessoaId})
                </h3>
                
                <form onSubmit={handleSubmit} className="form-grid">
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={novaTransacao.descricao}
                        onChange={e => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                        required
                        className="form-input"
                    />
                    
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="Valor (R$)"
                        value={novaTransacao.valor || ''}
                        onChange={e => setNovaTransacao({ ...novaTransacao, valor: parseFloat(e.target.value) || 0 })}
                        required
                        className="form-input"
                    />
                    
                    <select
                        value={novaTransacao.tipo}
                        onChange={e => {
                            const novoTipo = e.target.value as TipoTransacao;
                            setNovaTransacao({ 
                                ...novaTransacao, 
                                tipo: novoTipo,
                                categoriaId: 0
                            });
                        }}
                        className="form-select"
                        required
                    >
                        <option value="despesa">Despesa</option>
                        <option 
                            value="receita" 
                            disabled={pessoa ? pessoa.idade < 18 : false}
                        >
                            Receita {pessoa && pessoa.idade < 18 ? ' (indisponível para menores)' : ''}
                        </option>
                    </select>
                    
                    <select
                        value={novaTransacao.categoriaId}
                        onChange={e => setNovaTransacao({ ...novaTransacao, categoriaId: parseInt(e.target.value) })}
                        required
                        className="form-select"
                    >
                        <option value={0}>Selecione uma categoria</option>
                        {categoriasFiltradas.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.descricao} ({cat.finalidade})
                            </option>
                        ))}
                    </select>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? 'Carregando...' : 'Salvar Transação'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};