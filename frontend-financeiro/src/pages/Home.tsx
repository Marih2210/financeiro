import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <section className="hero">
                <h1 className="hero-title">
                    💰 <span className="gradient-text">Sistema Financeiro</span>
                </h1>
                <p className="hero-subtitle">
                    Gerencie suas finanças com elegância e eficiência
                </p>
            </section>

            <section className="cards-section">
                <h2 className="section-title">O que deseja gerenciar?</h2>
                
                <div className="cards-grid">
                    <div className="card" onClick={() => navigate('/pessoas')}>
                        <div className="card-icon">👥</div>
                        <h3 className="card-title">Pessoas</h3>
                        <p className="card-description">
                            Cadastre e gerencie todas as pessoas do sistema
                        </p>
                        <button className="card-button">
                            Acessar <span className="arrow">→</span>
                        </button>
                    </div>

                    <div className="card" onClick={() => navigate('/transacoes')}>
                        <div className="card-icon">💳</div>
                        <h3 className="card-title">Transações</h3>
                        <p className="card-description">
                            Controle receitas e despesas em um só lugar
                        </p>
                        <button className="card-button">
                            Acessar <span className="arrow">→</span>
                        </button>
                    </div>

                    <div className="card" onClick={() => navigate('/categorias')}>
                        <div className="card-icon">📁</div>
                        <h3 className="card-title">Categorias</h3>
                        <p className="card-description">
                            Organize suas transações por categorias
                        </p>
                        <button className="card-button">
                            Acessar <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2 className="section-title">Por que escolher?</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <h4>Rápido</h4>
                        <p>Operações instantâneas</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🔒</div>
                        <h4>Seguro</h4>
                        <p>Dados consistentes</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">📊</div>
                        <h4>Organizado</h4>
                        <p>Tudo categorizado</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">✨</div>
                        <h4>Moderno</h4>
                        <p>Design elegante</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Sistema Financeiro</p>
                <div className="footer-links">
                    <span>React</span>
                    <span>•</span>
                    <span>.NET</span>
                    <span>•</span>
                    <span>PostgreSQL</span>
                </div>
            </footer>
        </div>
    );
};