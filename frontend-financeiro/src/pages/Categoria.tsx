import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriaAPI } from '../apis/categoriaApi';
import { Modal } from '../components/Modal';
import { ConfirmModal } from '../components/ConfirmModal';
import type { Categoria } from '../models/categoriaModel';
import '../styles/Pages.css';

    // Página de categorias

export const CategoriaPage: React.FC = () => {

    // estados, navegação

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [categoriaToDelete, setCategoriaToDelete] = useState<number | null>(null);
    const [novaCategoria, setNovaCategoria] = useState<{
        descricao: string;
        finalidade: 'despesa' | 'receita' | 'ambas';
    }>({ 
        descricao: '', 
        finalidade: 'despesa' 
    });

    // No init da página carrega as categorias

    useEffect(() => {
        carregarCategorias();
    }, []);

    // Função com o método GET que carrega todas as categorias

    const carregarCategorias = async () => {
        try {
            setLoading(true);
            const data = await CategoriaAPI.getAll();
            setCategorias(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar categorias');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Método que chama o INSERT para criação de uma nova categoria

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await CategoriaAPI.create(novaCategoria);
            setNovaCategoria({ descricao: '', finalidade: 'despesa' });
            setIsModalOpen(false);
            carregarCategorias();
        } catch (err) {
            setError('Erro ao criar categoria');
            console.error(err);
        }
    };

    // Método que chama o modal de confirmação de delete para exclusão de categoria

    const confirmDelete = (id: number) => {
        setCategoriaToDelete(id);
        setIsConfirmOpen(true);
    };

    // Faz a exclusão após a confirmação

    const handleDelete = async () => {
        if (!categoriaToDelete) return;
        
        try {
            await CategoriaAPI.delete(categoriaToDelete);
            carregarCategorias();
        } catch (err) {
            setError('Erro ao excluir categoria');
            console.error(err);
        }
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
                    <span className="page-icon">📁</span>
                    <h1 className="page-title">Categorias</h1>
                </div>
                <div className="header-actions">
                    <button 
                        onClick={() => navigate('/categorias/totais')}
                        className="btn-totais"
                    >
                        Consultar Totais 
                    </button>
                    
                    <button onClick={() => setIsModalOpen(true)} className="btn-add">
                        + Nova Categoria
                    </button>
                    <button onClick={() => navigate('/')} className="btn-voltar">
                        ← Voltar
                    </button>
                </div>
            </header>

            {error && <div className="error-message">{error}</div>}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="➕ Adicionar Nova Categoria"
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <input
                        type="text"
                        placeholder="Nome da categoria"
                        value={novaCategoria.descricao}
                        onChange={e => setNovaCategoria({ ...novaCategoria, descricao: e.target.value })}
                        required
                        className="form-input"
                    />
                    <select
                        value={novaCategoria.finalidade}
                        onChange={e => setNovaCategoria({ 
                            ...novaCategoria, 
                            finalidade: e.target.value as 'despesa' | 'receita' | 'ambas'
                        })}
                        className="form-select"
                    >
                        <option value="despesa">Despesa</option>
                        <option value="receita">Receita</option>
                        <option value="ambas">Ambas</option>
                    </select>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">Salvar</button>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Cancelar</button>
                    </div>
                </form>
            </Modal>

            {/* Modal de Confirmação */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Excluir Categoria"
                message="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                type="danger"
            />

            <div className="content-card">
                <div className="table-header">
                    <h2 className="table-title">Lista de Categorias</h2>
                    <span className="table-count">{categorias.length} registro(s)</span>
                </div>

                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Finalidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map(categoria => (
                                    <tr key={categoria.id}>
                                        <td className="column-name">{categoria.descricao}</td>
                                        <td>
                                            <span className={`badge badge-${categoria.finalidade}`}>
                                                {finalidadeLabel[categoria.finalidade]}
                                            </span>
                                        </td>
                                        <td className="column-actions">
                                            <button 
                                                className="btn-delete"
                                                onClick={() => confirmDelete(categoria.id!)}
                                                title="Excluir"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {categorias.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="empty-message">
                                            Nenhuma categoria cadastrada
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