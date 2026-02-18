import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PessoaAPI } from '../apis/pessoaApi';
import { Modal } from '../components/Modal';
import { ConfirmModal } from '../components/ConfirmModal';
import type { Pessoa } from '../models/pessoaModel';
import '../styles/Pages.css';

export const PessoaPage: React.FC = () => {
    const navigate = useNavigate();
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);
    const [pessoaToDelete, setPessoaToDelete] = useState<number | null>(null);
    
    const [formData, setFormData] = useState<Omit<Pessoa, 'id'>>({ nome: '', idade: 0 });

    useEffect(() => {
        carregarPessoas();
    }, []);

    const carregarPessoas = async () => {
        try {
            setLoading(true);
            const data = await PessoaAPI.getAll();
            setPessoas(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar pessoas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && pessoaEditando) {
                await PessoaAPI.update(pessoaEditando.id!, {
                    id: pessoaEditando.id,
                    ...formData
                });
            } else {
                await PessoaAPI.create(formData);
            }
            
            setFormData({ nome: '', idade: 0 });
            setIsModalOpen(false);
            setIsEditing(false);
            setPessoaEditando(null);
            carregarPessoas();
        } catch (err) {
            setError(isEditing ? 'Erro ao atualizar pessoa' : 'Erro ao criar pessoa');
            console.error(err);
        }
    };

    const handleEdit = (pessoa: Pessoa) => {
        setFormData({ nome: pessoa.nome, idade: pessoa.idade });
        setPessoaEditando(pessoa);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const confirmDelete = (id: number) => {
        setPessoaToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleDelete = async () => {
        if (!pessoaToDelete) return;
        
        try {
            await PessoaAPI.delete(pessoaToDelete);
            carregarPessoas();
        } catch (err) {
            setError('Erro ao excluir pessoa');
            console.error(err);
        }
    };

    const handleNovaTransacao = (pessoaId: number) => {
        navigate('/transacoes/nova', { state: { pessoaId } });
    };

    const handleConsultarTotais = () => {
        navigate('/pessoas/totais');
    };

    const openModal = () => {
        setFormData({ nome: '', idade: 0 });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-left">
                    <span className="page-icon">👤</span>
                    <h1 className="page-title">Pessoas</h1>
                </div>
                <div className="header-actions">
                    <button onClick={handleConsultarTotais} className="btn-totais">
                        📊 Consultar Totais
                    </button>
                    
                    <button onClick={openModal} className="btn-add">
                        + Nova Pessoa
                    </button>
                    <button onClick={() => navigate('/')} className="btn-voltar">
                        ← Voltar
                    </button>
                </div>
            </header>

            {error && <div className="error-message">{error}</div>}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setPessoaEditando(null);
                }}
                title={isEditing ? '✏️ Editar Pessoa' : '➕ Adicionar Nova Pessoa'}
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <input
                        type="text"
                        placeholder="Nome completo"
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        required
                        className="form-input"
                    />
                    <input
                        type="number"
                        placeholder="Idade"
                        value={formData.idade || ''}
                        onChange={e => setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })}
                        required
                        className="form-input"
                        min="0"
                        max="150"
                    />
                    <div className="form-actions">
                        <button type="submit" className="btn-save">
                            {isEditing ? 'Atualizar' : 'Salvar'}
                        </button>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Excluir Pessoa"
                message="Tem certeza que deseja excluir esta pessoa? Todas as transações associadas também serão excluídas."
                confirmText="Excluir"
                cancelText="Cancelar"
                type="danger"
            />

            <div className="content-card">
                <div className="table-header">
                    <h2 className="table-title">Lista de Pessoas</h2>
                    <span className="table-count">{pessoas.length} registro(s)</span>
                </div>

                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pessoas.map(pessoa => (
                                    <tr key={pessoa.id}>
                                        <td className="column-name">{pessoa.nome}</td>
                                        <td>{pessoa.idade} anos</td>
                                        <td className="column-actions" style={{ display: 'flex', gap: '8px' }}>
                                            <button 
                                                className="btn-edit"
                                                onClick={() => handleEdit(pessoa)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            
                                            <button 
                                                className="btn-transacao"
                                                onClick={() => handleNovaTransacao(pessoa.id!)}
                                                title="Nova Transação"
                                            >
                                                💳
                                            </button>
                                            
                                            <button 
                                                className="btn-delete"
                                                onClick={() => confirmDelete(pessoa.id!)}
                                                title="Excluir"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {pessoas.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="empty-message">
                                            Nenhuma pessoa cadastrada
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