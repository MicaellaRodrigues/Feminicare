import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token no localStorage
    const token = localStorage.getItem("@FeminiCare:token");
    const storedUser = localStorage.getItem("@FeminiCare:user");

    if (token && storedUser) {
      // Configurar token nas requisições futuras
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const signIn = async (email, senha) => {
    try {
      // Fazer a requisição real para o backend
      const response = await api.post("/auth/login/professional", {
        email,
        password: senha, // O backend espera "password", não "senha"
      });

      // Verificar se a resposta é bem-sucedida
      if (response.data && response.data.success) {
        const { token, data } = response.data;

        // Formatando os dados do usuário conforme esperado pelo frontend
        const userData = {
          id: data.id,
          nome: data.name,
          email: data.email,
          especialidade: data.specialty || "",
          telefone: data.phone || "",
          numeroCred: data.credentialNumber || "",
          role: data.role,
        };

        // Armazenando os dados no localStorage
        localStorage.setItem("@FeminiCare:token", token);
        localStorage.setItem("@FeminiCare:user", JSON.stringify(userData));

        // Configurando o token para requisições futuras
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(userData);
        return { success: true };
      } else {
        return {
          success: false,
          message: "Credenciais inválidas",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao realizar login",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("@FeminiCare:token");
    localStorage.removeItem("@FeminiCare:user");
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

const cadastrar = async (userData) => {
  try {
    // Mapear os campos do frontend para o formato esperado pelo backend
    const professionalData = {
      name: userData.nome,
      email: userData.email || userData.emailCadastro, // Certifique-se de usar o campo correto
      password: userData.senha || userData.senhaCadastro, // Certifique-se de usar o campo correto
      specialty: userData.especialidade,
      phone: userData.telefone,
      credential: userData.numeroCred, // Aqui está a correção: credentialNumber → credential
    };

    const response = await api.post("/professionals", professionalData);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Cadastro realizado com sucesso!",
      };
    } else {
      return {
        success: false,
        message: "Erro ao realizar cadastro",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao realizar cadastro",
    };
  }
};


  const recuperarSenha = async (email) => {
    try {
      await api.post("/api/auth/forgot-password", {
        email,
        userType: "professional",
      });

      return {
        success: true,
        message: "Email de recuperação enviado com sucesso!",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Erro ao solicitar recuperação de senha",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut: logout,
        cadastrar,
        recuperarSenha,
        isAuthenticated: !!user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
