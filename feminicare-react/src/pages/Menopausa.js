import React from "react";
import Header from "../components/Header";
import "../styles/fase.css";

const Menopausa = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <div className="fase-container">
          <img
            src="../../images/menopausa-min.png"
            alt="Imagem Menopausa"
            className="fase-imagem"
          />

          <section className="fase-conteudo">
            <p className="fase-idade">+40 anos</p>
            <h2 className="fase-titulo">Menopausa</h2>

            <p className="fase-texto">
              A Menopausa não é uma sentença, é uma transição poderosa. É o
              corpo dizendo: "você chegou até aqui, agora bora viver com mais
              sabedoria, leveza e liberdade!".
            </p>

            <p className="fase-texto">
              Ah, a menopausa... esse momento mágico e cheio de mistérios, que
              muita gente trata como fim, mas que, na real, é só o começo de uma
              nova fase poderosa da vida da mulher! Se você tem 20 e poucos e
              acha que isso tá longe: calma, um dia chega! Se já passou dos 40 e
              tá se perguntando "o que está acontecendo com meu corpo?", vem cá
              que a gente explica. E se já tá vivendo essa fase: parabéns, você
              desbloqueou o modo "sábia e sem paciência pra besteira".
            </p>

            <p className="fase-texto">
              <strong>O que é a menopausa?</strong> A menopausa é o momento em
              que a menstruação vai embora de vez, geralmente entre os 45 e 55
              anos. Mas ela não chega sozinha: vem com sintomas, mudanças no
              corpo e... hormônios querendo fazer uma rave dentro de você.
            </p>

            <p className="fase-texto">
              <strong>Sintomas?</strong>
              <br />● Ondas de calor que fazem você se sentir um pastel na
              frigideira;
              <br />● Suor noturno (como se fosse verão no Alasca);
              <br />● Alterações de humor (um mix de diva pop e filme
              dramático);
              <br />● Insônia (porque o cérebro resolveu virar notívago);
              <br />● Pele mais seca, cabelo diferente e libido que... pode
              variar.
            </p>

            <p className="fase-texto">
              <strong>Mas tem coisa boa também!</strong> Sim, tem! Muitas
              mulheres relatam um senso de liberdade incrível: sem TPM, sem
              absorventes, sem medo de engravidar. E, com os cuidados certos,
              essa fase pode ser leve, divertida e cheia de autoconhecimento.
            </p>

            <p className="fase-texto">
              <strong>
                Dicas de ouro pra atravessar essa fase com estilo:
              </strong>
              <br />
              Alimentação equilibrada: invista em alimentos ricos em cálcio,
              vitamina D e ômega 3. Evite excesso de café, álcool e açúcar.
              <br />
              Exercícios físicos: fortalecem ossos, melhoram o humor e combatem
              o famoso "estresse da balança".
              <br />
              Sono de qualidade: crie uma rotina noturna relaxante. Nada de
              TikTok até 1h da manhã, hein!
              <br />
              Fale com seu médico! Existem reposições hormonais e tratamentos
              naturais que podem ajudar muito.
            </p>

            <p className="fase-texto">
              <strong>E o emocional?</strong> A menopausa mexe com o corpo e com
              o coração. Falar sobre isso, procurar apoio psicológico e
              compartilhar com amigas pode transformar tudo em uma experiência
              muito mais leve e até divertida. Rir dos próprios calores pode ser
              libertador!
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Menopausa;
