import React from "react";
import Header from "../components/Header";
import "../styles/fase.css";

const Puberdade = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <div className="fase-container">
          <img
            src="../../images/puberdade-min.png"
            alt="Imagem Puberdade"
            className="fase-imagem"
          />

          <section className="fase-conteudo">
            <p className="fase-idade">8 - 18 anos</p>
            <h2 className="fase-titulo">Puberdade</h2>

            <p className="fase-texto">
              Se você está suando sem motivo, brigando com o espelho e de
              repente ficou alérgico à sua família… bem-vindo à puberdade! Essa
              fase da vida é tipo uma montanha-russa que a gente não escolheu
              subir, mas que TODO MUNDO passa — e, acredite ou não, ela serve
              pra transformar você num adulto incrível (mesmo que pareça meio
              caótico agora).
            </p>

            <p className="fase-texto">
              <strong>O que é a puberdade, afinal?</strong> É o nome chique pra
              dizer que seu corpo está virando adulto. Os hormônios — tipo
              mensageiros internos — começam a trabalhar como se não houvesse
              amanhã. Resultado? Seu corpo, sua mente e suas emoções entram em
              modo turbo.
            </p>

            <p className="fase-texto">
              <strong>Mudanças à vista!</strong>
              <br />● Crescimento acelerado (aquele estirão que faz a calça de
              ontem virar bermuda hoje);
              <br />● Surgimento de pelos (em lugares que você nem imaginava);
              <br />● Suor com "personalidade" (o famoso cheirinho da
              puberdade);
              <br />● Voz mudando (e sim, ela pode falhar no meio de uma frase
              no meio da aula);
              <br />● Espinhas aparecendo (e querendo ser protagonistas no seu
              rosto);
              <br />● Coração que dispara, crushes que surgem, vergonha que
              triplica.
            </p>

            <p className="fase-texto">
              Mas calma, tudo isso é NORMAL. Todo mundo passa por isso. Uns mais
              cedo, outros mais tarde. E tá tudo bem!
            </p>

            <p className="fase-texto">
              <strong>
                Como sobreviver à puberdade sem perder o bom humor?
              </strong>
              <br />
              <strong>● Tenha paciência com você mesmo.</strong> Você não tá
              "estranho", tá em transformação.
              <br />
              <strong>● Cuide da higiene.</strong> Banho, desodorante e lavar o
              rosto viram aliados de peso!
              <br />
              <strong>● Alimente-se bem.</strong> Chocolate é vida, mas frutas e
              verduras também ajudam seu corpo a lidar com tudo isso.
              <br />
              <strong>● Durma.</strong> O sono é tipo o Wi-Fi do corpo: quando
              tá bom, tudo funciona melhor.
              <br />
              <strong>● Converse.</strong> Pode ser com os pais, professores,
              amigos ou alguém de confiança. Falar ajuda MUITO!
            </p>

            <p className="fase-texto">
              <strong>E o lado emocional?</strong>
              Você pode se sentir confuso, sensível ou até meio perdido. É
              normal. Seu cérebro também está crescendo e aprendendo a lidar com
              um mundo novo. Não precisa saber tudo agora — só precisa lembrar
              que você não está sozinho.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Puberdade;
