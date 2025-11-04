import React from 'react';
import "../styles/inicio.css";
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="home-container">
      <section className="home-hero">
        <h1>Bem-vinda ao FeminiCare</h1>
        <p>Um espaço acolhedor para entender, cuidar e celebrar todas as fases da saúde da mulher.</p>
        <Link to="/saude-mulher" className="hero-button">Explorar Saúde da Mulher</Link>
      </section>

      <section className="home-info">
        <div className="info-card">
          <h2>Informações Seguras</h2>
          <p>Conteúdos verificados sobre puberdade, ciclo menstrual, menopausa e muito mais.</p>
        </div>

        <div className="info-card">
          <h2>Comunidade e Apoio</h2>
          <p>Conheça histórias, participe e sinta-se acolhida em um espaço feito para você.</p>
        </div>

        <div className="info-card">
          <h2>Marketplace Consciente</h2>
          <p>Profissionais selecionados com carinho e foco no bem-estar feminino.</p>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
