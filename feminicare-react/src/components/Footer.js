import React from 'react';
import './../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} FeminiCare. Todos os direitos reservados.</p>
                <p>Contato: contato@feminicare.com</p>
            </div>
        </footer>
    );
};

export default Footer;