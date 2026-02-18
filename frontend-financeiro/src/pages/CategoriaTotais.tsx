import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriaAPI } from '../apis/categoriaApi';
import { TransacoesAPI } from '../apis/transacoesApi';
import type { Categoria } from '../models/categoriaModel';
import type { Transacao } from '../models/transacoesModel';
import '../styles/Pages.css';

interface CategoriaComTotais extends Categoria {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

interface TotaisGeraisCategoria {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
    quantidadeCategorias: number;
}

export const CategoriaTotais: React.FC = () => {
    const navigate = useNavigate();
    const [categoriasComTotais, setCategoriasComTotais] = useState<CategoriaComTotais[]>([]);
    const [totaisGerais, setTotaisGerais] = useState<TotaisGeraisCategoria>({
        totalReceitas: 0,
        totalDespesas: 0,
        saldoLiquido: 0,
        quantidadeCategorias: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);
            
            const [categorias, transacoes] = await Promise.all([
                CategoriaAPI.getAll(),
                TransacoesAPI.getAll()
            ]);

            const categoriasComTotaisCalc = categorias.map(categoria => {
                const transacoesCategoria = transacoes.filter(t => t.categoriaId === categoria.id);
                
                const totalReceitas = transacoesCategoria
                    .filter(t => t.tipo === 'receita')
                    .reduce((acc, t) => acc + t.valor, 0);
                
                const totalDespesas = transacoesCategoria
                    .filter(t => t.tipo === 'despesa')
                    .reduce((acc, t) => acc + t.valor, 0);
                
                return {
                    ...categoria,
                    totalReceitas,
                    totalDespesas,
                    saldo: totalReceitas - totalDespesas
                };
            });

            const totais = categoriasComTotaisCalc.reduce((acc, categoria) => ({
                totalReceitas: acc.totalReceitas + categoria.totalReceitas,
                totalDespesas: acc.totalDespesas + categoria.totalDespesas,
                saldoLiquido: (acc.totalReceitas + categoria.totalReceitas) - (acc.totalDespesas + categoria.totalDespesas),
                quantidadeCategorias: acc.quantidadeCategorias + 1
            }), {
                totalReceitas: 0,
                totalDespesas: 0,
                saldoLiquido: 0,
                quantidadeCategorias: 0
            });

            setCategoriasComTotais(categoriasComTotaisCalc);
            setTotaisGerais(totais);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar dados');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatarValor = (valor: number) => {
        return valor.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const finalidadeLabel = {
        despesa: 'Despesa',
        receita: 'Receita',
        ambas: 'Ambas'
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-left">
                    <span className="page-icon">📊</span>
                    <h1 className="page-title">Totais por Categoria</h1>
                </div>
                <div className="header-actions">
                    <button onClick={() => navigate('/categorias')} className="btn-voltar">
                        ← Voltar para Categorias
                    </button>
                </div>
            </header>

            {error && <div className="error-message">{error}</div>}

            <div className="content-card">
                <div className="table-header">
                    <h2 className="table-title">Resumo Financeiro por Categoria</h2>
                    <span className="table-count">{categoriasComTotais.length} categoria(s)</span>
                </div>

                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Categoria</th>
                                        <th>Finalidade</th>
                                        <th className="valor-col">Receitas</th>
                                        <th className="valor-col">Despesas</th>
                                        <th className="valor-col">Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoriasComTotais.map(categoria => (
                                        <tr key={categoria.id}>
                                            <td className="column-name">{categoria.descricao}</td>
                                            <td>
                                                <span className={`badge badge-${categoria.finalidade}`}>
                                                    {finalidadeLabel[categoria.finalidade]}
                                                </span>
                                            </td>
                                            <td className="valor-receita">
                                                {formatarValor(categoria.totalReceitas)}
                                            </td>
                                            <td className="valor-despesa">
                                                {formatarValor(categoria.totalDespesas)}
                                            </td>
                                            <td className={categoria.saldo >= 0 ? 'valor-receita' : 'valor-despesa'}>
                                                {formatarValor(categoria.saldo)}
                                            </td>
                                        </tr>
                                    ))}
                                    {categoriasComTotais.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="empty-message">
                                                Nenhuma categoria cadastrada
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {categoriasComTotais.length > 0 && (
                            <div className="totais-gerais">
                                <h3>Totais Gerais</h3>
                                <div className="totais-grid">
                                    <div className="total-item">
                                        <span className="total-label">Total de Receitas: </span>
                                        <span className="total-valor valor-receita">
                                            {formatarValor(totaisGerais.totalReceitas)}
                                        </span>
                                    </div>
                                    <div className="total-item">
                                        <span className="total-label">Total de Despesas: </span>
                                        <span className="total-valor valor-despesa">
                                            {formatarValor(totaisGerais.totalDespesas)}
                                        </span>
                                    </div>
                                    <div className="total-item">
                                        <span className="total-label">Saldo Líquido: </span>
                                        <span className={`total-valor ${totaisGerais.saldoLiquido >= 0 ? 'valor-receita' : 'valor-despesa'}`}>
                                            {formatarValor(totaisGerais.saldoLiquido)}
                                        </span>
                                    </div>
                                    <div className="total-item">
                                        <span className="total-label">Total de Categorias: </span>
                                        <span className="total-valor">{totaisGerais.quantidadeCategorias}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};