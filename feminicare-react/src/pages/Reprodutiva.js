import React from "react";
import Header from "../components/Header";
import "../styles/fase.css";

const Reprodutiva = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <div className="fase-container">
          <img
            src="../../images/reprodutiva-min.png"
            alt="Imagem Reprodutiva"
            className="fase-imagem"
          />

          <section className="fase-conteudo">
            <p className="fase-idade">12 - 39 anos</p>
            <h2 className="fase-titulo">Reprodutiva</h2>

            <p className="fase-texto">
              Entre a primeira menstruação (a famosa menarca) e a chegada da
              menopausa, existe uma fase poderosa, cheia de altos, baixos e
              reviravoltas internas: a fase reprodutiva. Mas calma, não é porque
              o corpo pode engravidar que essa é a única missão da fase — longe
              disso! Esse período é sobre saúde, autoconhecimento e liberdade de
              escolha.
            </p>

            <p className="fase-texto">
              <strong>Quando começa e quando termina?</strong> A fase
              reprodutiva começa, com a chegada da menstruação, e vai até quando
              a menopausa dá o ar da graça. Durante esse tempo, o corpo da
              mulher passa por ciclos mensais — alguns tranquilos, outros mais
              rebeldes — mas todos com um propósito biológico incrível.
            </p>

            <p className="fase-texto">
              <strong>Algumas mudanças...</strong>
              <br />● Ovulação: todo mês, um óvulo é liberado — o famoso "dia
              fértil".
              <br />● O Ciclo menstrual: é a dança dos hormônios (estrogênio e
              progesterona) preparando tudo pra uma possível gravidez.
              <br />● Menstruação: quando não há fecundação, o útero "desmonta"
              o ninho e expulsa o sangue.
              <br />● Alterações físicas e emocionais: TPM, mudanças de humor,
              inchaços, sensibilidade... tudo isso pode fazer parte do pacote.
            </p>

            <p className="fase-texto">
              <strong>Mas e se eu não quiser ter filhos?</strong> problema
              nenhum! A fase reprodutiva não é sinônimo de maternidade
              obrigatória. É apenas um sinal de que seu corpo está funcionando
              de forma fértil. Você pode usar esse tempo pra focar em você, no
              seu bem-estar, na carreira, nos sonhos. Maternidade é uma
              possibilidade, não um destino obrigatório.
            </p>

            <p className="fase-texto">
              <strong>Dicas pra viver bem essa fase:</strong>
              <br />
              <strong>● Acompanhe seu ciclo: </strong>Você não tá "estranho", tá
              em transformação.
              <br />
              <strong>● Previna-se:</strong> se tiver vida sexual ativa, use
              métodos contraceptivos e cuide da saúde íntima.
              <br />
              <strong>● Visite a ginecologista com regularidade:</strong> exames
              de rotina são essenciais.
              <br />
              <strong>● Alimente-se bem e mexa o corpo:</strong> isso faz
              maravilhas para os hormônios!
              <br />
              <strong>● Se permita descansar:</strong> não se cobre tanto nos
              dias difíceis do ciclo. O corpo fala — e merece escuta.
            </p>

            <p className="fase-texto">
              <strong>No fim das contas...</strong> A fase reprodutiva é um
              capítulo potente da vida feminina. É cheia de curvas, sim, mas
              também de descobertas, aprendizados e muita força. É a fase do
              florescer consciente: onde cada mulher pode se conectar com seu
              corpo de um jeito único e, principalmente, fazer suas próprias
              escolhas. Porque ser mulher é viver uma montanha-russa hormonal
              com estilo e coragem. E, cá entre nós, a gente dá conta — com
              sangue, suor e sabedoria.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Reprodutiva;
