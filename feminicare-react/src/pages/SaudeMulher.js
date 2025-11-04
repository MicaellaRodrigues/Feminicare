import React from "react";
import Header from "../components/Header";
import Card from "../components/Cards";
import { BrowserRouter } from "react-router-dom";
import "../styles/saudemulher.css";

// const SaudeMulher = () => {
//   const cards = [
//     {
//       id: 1,
//       image: "/img/puberdade-min.png",
//       title: "Puberdade",
//       age: "8–18 anos",
//       path: "/puberdade",
//     },
//     {
//       id: 2,
//       image: "/img/reprodutiva-min.png",
//       title: "Reprodutiva",
//       age: "12–39 anos",
//       path: "/reprodutiva",
//     },
//     {
//       id: 3,
//       image: "/img/menopausa-min.png",
//       title: "Menopausa",
//       age: "40+ anos",
//       path: "/menopausa",
//     },
//   ];

//   return (
//     <>
//       {/* <Header /> */}
//       <main className="container">
//         <div className="titulo-cards esquerda">
//           <h2>Selecione o período ou fase em que você está:</h2>
//         </div>

//         {cards.map((card) => (
//           <Card
//             key={card.id}
//             image={card.image}
//             title={card.title}
//             age={card.age}
//             path={card.path}
//           />
//         ))}
//       </main>
//     </>
//   );
// };

// export default SaudeMulher;

const fases = [
  {
    titulo: 'Puberdade',
    faixaEtaria: '8-18 anos',
    topicos: ['Adolescência'],
    imagem: '../../images/puberdade-min.png',
    path: '/Puberdade', // funciona só nesse card
  },
  {
    titulo: 'Reprodutiva',
    faixaEtaria: '19-39 anos',
    topicos: ['Menarca', 'Menstruação'],
    imagem: '../../images/reprodutiva-min.png',
    path: '/Reprodutiva', // funciona só nesse card
  },
  {
    titulo: 'Menopausa',
    faixaEtaria: '40+ anos',
    topicos: ['Climatério', 'Perimenopausa', 'Pós-Menopausa'],
    imagem: '../../images/menopausa-min.png',
    path: '/Menopausa', // funciona só nesse card
  }
];

const FasesCiclo = () => {
  return (
    <div className="fases-container">
      <p className="subtitulo">Selecione o período ou fase em que você está:</p>
      <div className="fases-grid">
        {fases.map((fase, index) => (
          <div key={index} className="fase-card">
            <img src={fase.imagem} alt={fase.titulo} className="fase-imagem" />
            <h3 className="fase-titulo">{fase.titulo}</h3>
            <p className="fase-idade">{fase.faixaEtaria}</p>
            <ul className="fase-topicos">
              {fase.topicos.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
            
            <button className="btn-saiba-mais">Saiba mais</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FasesCiclo;