import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Semen Morozov. All rights reserved.</p>
            <p>
                <a href="/privacy" className={styles.footerLink}>Privacy Policy</a> | 
                <a href="/terms" className={styles.footerLink}>Terms of Service</a>
            </p>
        </footer>
    );
};

export default Footer;
