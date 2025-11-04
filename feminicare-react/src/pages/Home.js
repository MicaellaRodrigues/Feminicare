import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { signIn, cadastrar } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // Estados para login
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });

  // Estados para cadastro
  const [cadastroData, setCadastroData] = useState({
    nome: "",
    emailCadastro: "",
    senhaCadastro: "",
    confSenha: "",
    especialidade: "",
    telefone: "",
    numeroCred: "",
  });

  // Handle login form changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle cadastro form changes
  const handleCadastroChange = (e) => {
    setCadastroData({ ...cadastroData, [e.target.name]: e.target.value });
  };

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn(loginData.email, loginData.senha);

    if (result.success) {
      navigate("/saude-mulher");
    } else {
      setMensagem({ tipo: "error", texto: result.message });
    }
  };

  // Cadastro submit
  const handleCadastroSubmit = async (e) => {
    e.preventDefault();

    // Validação das senhas
    if (cadastroData.senhaCadastro !== cadastroData.confSenha) {
      setMensagem({ tipo: "error", texto: "As senhas não coincidem" });
      return;
    }

    const result = await cadastrar({
      nome: cadastroData.nome,
      email: cadastroData.emailCadastro,
      senha: cadastroData.senhaCadastro,
      especialidade: cadastroData.especialidade,
      telefone: cadastroData.telefone,
      numeroCred: cadastroData.numeroCred,
    });

    if (result.success) {
      setMensagem({ tipo: "success", texto: result.message });
      // Limpar o formulário de cadastro
      setCadastroData({
        nome: "",
        emailCadastro: "",
        senhaCadastro: "",
        confSenha: "",
        especialidade: "",
        telefone: "",
        numeroCred: "",
      });
    } else {
      setMensagem({ tipo: "error", texto: result.message });
    }
  };

  return (
    <>
      {/* <Header /> */}
      <main>
        {mensagem.texto && (
          <div className={`flash-messages ${mensagem.tipo}`}>
            <p>{mensagem.texto}</p>
          </div>
        )}

        <div className="login">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={loginData.senha}
              onChange={handleLoginChange}
              required
            />

            <a href="/esqueci-senha">Esqueci a senha</a>
            <br />
            <button type="submit">Entrar</button>
          </form>
        </div>

        <div className="vl"></div>

        <div className="cadastro">
          <h2>Faça o seu cadastro</h2>
          <form onSubmit={handleCadastroSubmit}>
            <label htmlFor="nome">Nome Completo:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={cadastroData.nome}
              onChange={handleCadastroChange}
              required
            />

            <label htmlFor="emailCadastro">Email:</label>
            <input
              type="email"
              id="emailCadastro"
              name="emailCadastro"
              value={cadastroData.emailCadastro}
              onChange={handleCadastroChange}
              required
            />

            <label htmlFor="senhaCadastro">Senha:</label>
            <input
              type="password"
              id="senhaCadastro"
              name="senhaCadastro"
              value={cadastroData.senhaCadastro}
              onChange={handleCadastroChange}
              required
            />

            <label htmlFor="confSenha">Confirmar senha:</label>
            <input
              type="password"
              id="confSenha"
              name="confSenha"
              value={cadastroData.confSenha}
              onChange={handleCadastroChange}
              required
            />

            <label htmlFor="especialidade">Especialidade:</label>
            <input
              type="text"
              id="especialidade"
              name="especialidade"
              value={cadastroData.especialidade}
              onChange={handleCadastroChange}
              required
            />

            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={cadastroData.telefone}
              onChange={handleCadastroChange}
              required
            />

            <label htmlFor="numeroCred">Número da credencial:</label>
            <input
              type="text"
              id="numeroCred"
              name="numeroCred"
              value={cadastroData.numeroCred}
              onChange={handleCadastroChange}
              required
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
