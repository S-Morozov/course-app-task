// src/components/NavBar/NavBar.tsx
import React, { useState } from 'react';
import styles from './Navbar.module.css';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>My Course App</div>
            <div className={`${styles.toggle} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
            <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
                <a href="/">Home</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </nav>
    );
};

export default NavBar;
