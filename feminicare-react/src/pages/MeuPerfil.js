import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/perfil.css";

const MeuPerfil = () => {
  const { user, isAuthenticated, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    telefone: "",
    numeroCred: "",
    especialidade: "",
    local: "",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  // Função para buscar dados do profissional
  const fetchUserData = async () => {
    if (!user || !user.id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/professionals/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const professionalData = response.data.professional;
      
      setUserData({
        nome: professionalData.name || "",
        email: professionalData.email || "",
        telefone: professionalData.phone || "",
        numeroCred: professionalData.credentialNumber || "",
        especialidade: professionalData.specialty || "",
        local: professionalData.officeLocation || "",
      });
    } catch (err) {
      console.error("Erro ao buscar dados do profissional:", err);
      setError("Não foi possível carregar os dados do perfil");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Redirecionar se não estiver autenticado
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    fetchUserData();
  }, [isAuthenticated, user, navigate, token]);  // Adicionado token como dependência

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo ${name} alterado para: ${value}`);  // Adicionado log para debug
    
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.id) return;

    setIsLoading(true);
    setError(null);

    try {
      // Mapeie os campos do formulário para o formato esperado pelo backend
      const updatedData = {
        name: userData.nome,
        phone: userData.telefone,
        credentialNumber: userData.numeroCred,
        specialty: userData.especialidade,
        officeLocation: userData.local,
      };

      await axios.put(`${API_URL}/professionals/${user.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsEditing(false);
      // Exibir mensagem de sucesso temporária
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Não foi possível atualizar o perfil. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const habilitarEdicao = () => {
    setIsEditing(true);
  };
  
  const cancelarEdicao = () => {
    // Recarrega os dados originais ao cancelar
    fetchUserData();
    setIsEditing(false);
  };

  if (isLoading && !isEditing) {
    return (
      <main>
        <div className="perfil-container">
          <h1>Carregando dados...</h1>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="perfil-container">
          <h1>Dados do Perfil</h1>

          {error && <div className="error-message">{error}</div>}

          {/* Status de edição (debug) */}
          {process.env.NODE_ENV === 'development' && (
            <p style={{color: 'gray', fontSize: '0.8em'}}>
              Modo de edição: {isEditing ? 'ATIVADO' : 'DESATIVADO'}
            </p>
          )}

          {/* Foto de Perfil */}
          <div className="foto-perfil">
            <img src="../../images/medica.jpeg" alt="Foto de perfil" />
          </div>

          {/* Formulário de Dados */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={userData.nome}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "editable" : ""}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled={true}
              className="disabled"
            />

            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={userData.telefone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "editable" : ""}
            />

            <label htmlFor="numeroCred">Número da Credencial:</label>
            <input
              type="text"
              id="numeroCred"
              name="numeroCred"
              value={userData.numeroCred}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "editable" : ""}
            />

            <label htmlFor="especialidade">Especialidade:</label>
            <input
              type="text"
              id="especialidade"
              name="especialidade"
              value={userData.especialidade}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "editable" : ""}
            />

            <label htmlFor="local">Local do Consultório:</label>
            <input
              type="text"
              id="local"
              name="local"
              value={userData.local}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "editable" : ""}
            />

            <label>Senha:</label>
            <input type="password" value="**********" disabled={true} className="disabled" />

            {isEditing ? (
              <div className="button-group">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "SALVANDO..." : "SALVAR"}
                </button>
                <button 
                  type="button" 
                  onClick={cancelarEdicao}
                  disabled={isLoading}
                >
                  CANCELAR
                </button>
              </div>
            ) : (
              <div className="button-group">
                <button type="button" onClick={habilitarEdicao}>
                  EDITAR
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  SAIR
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default MeuPerfil;
