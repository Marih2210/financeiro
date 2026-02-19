import React from 'react';
import '../styles/ConfirmModal.css';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

// Modal criado para a confirmação de exclusão da pessoa/categoria (criado com o intuito de ser reutilizado)

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'danger'
}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="confirm-modal-overlay" onClick={onClose}>
            <div className="confirm-modal-content" onClick={e => e.stopPropagation()}>
                <div className={`confirm-modal-icon ${type}`}>
                    {type === 'danger' && '🗑️'}
                    {type === 'warning' && '⚠️'}
                    {type === 'info' && 'ℹ️'}
                </div>
                
                <h3 className="confirm-modal-title">{title}</h3>
                <p className="confirm-modal-message">{message}</p>
                
                <div className="confirm-modal-actions">
                    <button 
                        className="confirm-modal-cancel"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button 
                        className={`confirm-modal-confirm ${type}`}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};