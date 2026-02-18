import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PessoaAPI } from '../apis/pessoaApi';
import { TransacoesAPI } from '../apis/transacoesApi';
import type { Pessoa } from '../models/pessoaModel';
import type { Transacao } from '../models/transacoesModel';
import '../styles/Pages.css';

interface PessoaComTotais extends Pessoa {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

interface TotaisGerais {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
    quantidadePessoas: number;
}

export const PessoaTotaisPage: React.FC = () => {
    const navigate = useNavigate();
    const [pessoasComTotais, setPessoasComTotais] = useState<PessoaComTotais[]>([]);
    const [totaisGerais, setTotaisGerais] = useState<TotaisGerais>({
        totalReceitas: 0,
        totalDespesas: 0,
        saldoLiquido: 0,
        quantidadePessoas: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);
            
            const [pessoas, transacoes] = await Promise.all([
                PessoaAPI.getAll(),
                TransacoesAPI.getAll()
            ]);

            const pessoasComTotaisCalc = pessoas.map(pessoa => {
                const transacoesPessoa = transacoes.filter(t => t.pessoaId === pessoa.id);
                
                const totalReceitas = transacoesPessoa
                    .filter(t => t.tipo === 'receita')
                    .reduce((acc, t) => acc + t.valor, 0);
                
                const totalDespesas = transacoesPessoa
                    .filter(t => t.tipo === 'despesa')
                    .reduce((acc, t) => acc + t.valor, 0);
                
                return {
                    ...pessoa,
                    totalReceitas,
                    totalDespesas,
                    saldo: totalReceitas - totalDespesas
                };
            });

            const totais = pessoasComTotaisCalc.reduce((acc, pessoa) => ({
                totalReceitas: acc.totalReceitas + pessoa.totalReceitas,
                totalDespesas: acc.totalDespesas + pessoa.totalDespesas,
                saldoLiquido: (acc.totalReceitas + pessoa.totalReceitas) - (acc.totalDespesas + pessoa.totalDespesas),
                quantidadePessoas: acc.quantidadePessoas + 1
            }), {
                totalReceitas: 0,
                totalDespesas: 0,
                saldoLiquido: 0,
                quantidadePessoas: 0
            });

            setPessoasComTotais(pessoasComTotaisCalc);
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

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-left">
                    <span className="page-icon">📊</span>
                    <h1 className="page-title">Totais por Pessoa</h1>
                </div>
                <div className="header-actions">
                    <button onClick={() => navigate('/pessoas')} className="btn-voltar">
                        ← Voltar para Pessoas
                    </button>
                </div>
            </header>

            {error && <div className="error-message">{error}</div>}

            <div className="content-card">
                <div className="table-header">
                    <h2 className="table-title">Resumo Financeiro por Pessoa</h2>
                    <span className="table-count">{pessoasComTotais.length} pessoa(s)</span>
                </div>

                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th className="valor-col">Receitas</th>
                                        <th className="valor-col">Despesas</th>
                                        <th className="valor-col">Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pessoasComTotais.map(pessoa => (
                                        <tr key={pessoa.id}>
                                            <td className="column-name">{pessoa.nome}</td>
                                            <td>{pessoa.idade} anos</td>
                                            <td className="valor-receita">
                                                {formatarValor(pessoa.totalReceitas)}
                                            </td>
                                            <td className="valor-despesa">
                                                {formatarValor(pessoa.totalDespesas)}
                                            </td>
                                            <td className={pessoa.saldo >= 0 ? 'valor-receita' : 'valor-despesa'}>
                                                {formatarValor(pessoa.saldo)}
                                            </td>
                                        </tr>
                                    ))}
                                    {pessoasComTotais.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="empty-message">
                                                Nenhuma pessoa cadastrada
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {pessoasComTotais.length > 0 && (
                            <div className="totais-gerais" style={{ marginTop: '20px' }}>
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
                                        <span className="total-label">Total de Pessoas: </span>
                                        <span className="total-valor">{totaisGerais.quantidadePessoas}</span>
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