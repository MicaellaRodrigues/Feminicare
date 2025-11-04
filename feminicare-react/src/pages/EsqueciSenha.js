import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import "../styles/esqueci-senha.css";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const { recuperarSenha } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMensagem("Por favor, insira um email válido");
      setTipo("error");
      return;
    }

    try {
      const result = await recuperarSenha(email);

      if (result.success) {
        setEnviado(true);
        setMensagem(
          "Um email de recuperação foi enviado para o seu endereço de email."
        );
        setTipo("success");
      } else {
        setMensagem(result.message);
        setTipo("error");
      }
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error);
      setMensagem(
        "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde."
      );
      setTipo("error");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <main>
        <div className="reset-password-container">
          <h1>Esqueci a senha</h1>

          {!enviado ? (
            <>
              <p>
                Insira o endereço de e-mail
                <br /> associado à sua conta FeminiCare.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  required
                />
                <button type="submit">Continuar</button>
              </form>
            </>
          ) : (
            <div className="mensagem-sucesso">
              <p>{mensagem}</p>
              <Link to="/" className="voltar-btn">
                Voltar para o login
              </Link>
            </div>
          )}

          {!enviado && mensagem && (
            <p className={`mensagem-${tipo}`}>{mensagem}</p>
          )}
        </div>
      </main>
    </>
  );
};

export default EsqueciSenha;
