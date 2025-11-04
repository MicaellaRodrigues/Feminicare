import React from "react";
import Header from "../components/Header";
import "../styles/sobrenos.css";

// const SobreNos = () => {
//   return (
//     <>
//       {/* <Header /> */}
//       <main className="sobre-nos-container">
//         <img
//           src="../../images/Daisy.svg"
//           alt="Flor decorativa"
//           className="imagem-lateral"
//         />

//         <div className="sobre-nos-box">
//           <h1>Sobre Nós</h1>
//           <p>
//             Criamos este site com o propósito de oferecer um espaço seguro e
//             confiável para você explorar tudo sobre o ciclo menstrual e as
//             diferentes fases da vida da mulher. Aqui, você encontrará uma ampla
//             gama de conteúdos cuidadosamente elaborados, desde informações
//             básicas sobre a menstruação até detalhes mais aprofundados sobre a
//             saúde reprodutiva e emocional das mulheres.
//           </p>
//           <p>
//             Nosso objetivo é garantir que todas as garotas tenham acesso a
//             informações claras e cientificamente embasadas, para que possam
//             entender melhor o que acontece com seus corpos em cada etapa da
//             vida. Queremos que este seja um espaço onde você se sinta acolhida e
//             possa tirar todas as suas dúvidas sem hesitação, contribuindo para
//             uma jornada mais informada e tranquila.
//           </p>
//           <p className="encerramento">Aproveitem, meninas :)</p>
//         </div>
//       </main>
//     </>
//   );
// };

const SobreNos = () => {
  return (
    <div className="sobre-nos-wrapper">
      <div className="sobre-nos-card">
        <h1>Sobre Nós</h1>
        <p>
          Criamos este site com o propósito de oferecer um espaço seguro e confiável para você explorar tudo sobre o ciclo menstrual e as diferentes fases da vida da mulher. Aqui, você encontrará uma ampla gama de conteúdos cuidadosamente elaborados, desde informações básicas sobre a menstruação até detalhes mais aprofundados sobre a saúde reprodutiva e emocional das mulheres.
        </p>
        <p>
          Nosso objetivo é garantir que todas as garotas tenham acesso a informações claras e cientificamente embasadas, para que possam entender melhor o que acontece com seus corpos em cada etapa da vida. Queremos que este seja um espaço onde você se sinta acolhida e possa tirar todas as suas dúvidas sem hesitação, contribuindo para uma jornada mais informada e tranquila.
        </p>
        <p className="aproveitem">Aproveitem, meninas :)</p>
      </div>
    </div>
  );
};

export default SobreNos;
