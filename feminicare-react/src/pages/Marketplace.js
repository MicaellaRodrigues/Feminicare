import React from "react";
import "../styles/marketplace.css";

const Marketplace = () => {
  return (
    <main className="marketplace-container">
      <h1 className="titulo">Nossa Equipe</h1>

      <div className="cards-grid">
        {/* Linha 1 */}
        <div className="card">
          <div className="card-foto">
            <img src="../../images/CarlosMendes.jpeg" alt="Dr. Carlos Mendes" />
          </div>
          <h3 className="nome">Dr. Carlos Mendes</h3>
          <p className="especialidade">Ginecologista</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        <div className="card">
          <div className="card-foto">
            <img src="../../images/RobertaMedica.jpeg" alt="Dra. Roberta Leal" />
          </div>
          <h3 className="nome">Dra. Roberta Leal</h3>
          <p className="especialidade">Nutricionista</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        <div className="card">
          <div className="card-foto">
            <img src="../../images/SergioMedico.jpeg" alt="Dr. Sérgio Alves" />
          </div>
          <h3 className="nome">Dr. Sérgio Alves</h3>
          <p className="especialidade">Ginecologista</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        <div className="card">
          <div className="card-foto">
            <img src="../../images/JuliaMedica.jpeg" alt="Dra. Julia Menezes" />
          </div>
          <h3 className="nome">Dra. Julia Menezes</h3>
          <p className="especialidade">Endocrinologista</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        {/* Linha 2 */}
        <div className="card">
          <div className="card-foto">
            <img src="../../images/GiuliaMedica.jpeg" alt="Dr. Giulia Matero " />
          </div>
          <h3 className="nome">Dr. Giulia Matero</h3>
          <p className="especialidade">Educadora Física</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        <div className="card">
          <div className="card-foto">
            <img src="../../images/JoseMedico.jpeg" alt="Dr. José Henrique" />
          </div>
          <h3 className="nome">Dr. José Henrique</h3>
          <p className="especialidade">Nutricionista</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        <div className="card">
          <div className="card-foto">
            <img src="../../images/MarcelaMedica.jpeg" alt="Dra. Marcela Dias" />
          </div>
          <h3 className="nome">Dra. Marcela Dias</h3>
          <p className="especialidade">Psicóloga</p>
          <div className="icone-estrela">✻</div>
          <button className="btn-contato">Contato</button>
        </div>

        
      </div>
    </main>
  );
};

export default Marketplace;
