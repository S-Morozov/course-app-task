import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false }) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} 
        >
            {children}
        </button>
    );
};

export default Button;
