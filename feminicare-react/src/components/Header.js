import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/header.css";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">
        FeminiCare
        <img src="../../images/Daisy.svg" alt="Daisy" />
      </div>
      <nav>
        <ul className="button-list">
          <li>
            <Link to="/Inicio" className="button">
              Início
            </Link>
          </li>
          <li>
            <Link to="/sobre-nos" className="button">
              Sobre nós
            </Link>
          </li>
          <li>
            <Link to="/marketplace" className="button">
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/" className="button">
              Login
            </Link>
          </li>
        </ul>
         
        
        <div className="search-login">
          <input type="text" placeholder="BUSCAR" />
          {isAuthenticated ? (
            <Link to="/meu-perfil">
              <button>MEU PERFIL</button>
            </Link>
          ) : (
            <button onClick={() => navigate("/")}>MEU PERFIL</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
