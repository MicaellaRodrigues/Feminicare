import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";
import SaudeMulher from "./pages/SaudeMulher";
import Puberdade from "./pages/Puberdade";
import Reprodutiva from "./pages/Reprodutiva";
import Menopausa from "./pages/Menopausa";
import MeuPerfil from "./pages/MeuPerfil";
import EsqueciSenha from "./pages/EsqueciSenha";
import Marketplace from "./pages/Marketplace";
import Inicio from "./pages/Inicio";

import "./styles/global.css";

function App() {
  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/saude-mulher" element={<SaudeMulher />} />
        <Route path="/puberdade" element={<Puberdade />} />
        <Route path="/reprodutiva" element={<Reprodutiva />} />
        <Route path="/menopausa" element={<Menopausa />} />
        <Route path="/meu-perfil" element={<MeuPerfil />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/inicio" element={<Inicio />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
