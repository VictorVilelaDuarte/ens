/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { Container, SubTitle, ImagePCE, ImageDiv } from './styles';

import Title from '../../components/Title';
import Pce1 from '../../assets/PCE1.jpg';
import Pce2 from '../../assets/PCE2.jpg';
import Pce3 from '../../assets/PCE3.jpg';
import Pce4 from '../../assets/PCE4.jpg';
import Pce5 from '../../assets/PCE5.jpg';
import Pce6 from '../../assets/PCE6.jpg';

function Pce() {
  const [pce, setPce] = useState(1);

  return (
    <Container>
      <Title>Pontos Concretos de Esforço</Title>
      <p>
        Seguir numa direção de crescimento espiritual e humano pressupõe iniciar
        um itinerário lógico e usar os meios que nos ajudem a manter fielmente
        essa direção.
      </p>
      <p>
        As ENS deram o nome de PCE a esses meios que correspondem as atitudes
        interiores que precisam ser despertadas e assimiladas para que conduzam
        a uma nova forma de viver, meios que imprimem uma disciplina que ajuda
        os casais a pôr o Evangelho em prática na sua vida quotidiana.
      </p>
      <p>
        A decisão de “viver” os PCEs é uma adesão de coração e concretiza-se com
        um esforço de vontade: o esforço aplicado à cada ponto concreto que
        ajuda os casais a acolher o Espírito Santo que age neles, que os vai
        transformando pouco a pouco fazendo-os crescer ao desenvolver uma
        espiritualidade conjugal que os aproxima mais de Deus, um do outro e dos
        outros. Em plena liberdade, assumimos fazer esforços sobre seis pontos
        concretos que são um convite a:
      </p>
      • Escutar assiduamente a Palavra de Deus;
      <br /> • Encontrar-se todos os dias com o Senhor numa Oração Pessoal –
      meditação;
      <br /> • Encontrar-se diariamente, marido e mulher, numa Oração Conjugal e
      se, possível, familiar;
      <br /> • Dedicar, cada mês, um tempo para um verdadeiro diálogo conjugal
      sob o olhar do Senhor – Dever de se Sentar;
      <br /> • Fixar cada um para si mesmo uma Regra de Vida e revê-la todos os
      meses;
      <br /> • Fazer todos os anos um Retiro vivido, se possível, em casal.
      <br />
      <br />
      <br />
      <Tabs
        defaultActiveKey={1}
        onSelect={(key) => {
          setPce(key);
        }}
      >
        <Tab eventKey={1} title="1- Escuta da Palavra" />
        <Tab eventKey={2} title="2- Meditação" />
        <Tab eventKey={3} title="3- Oração Conjugal" />
        <Tab eventKey={4} title="4- Dever de Sentar-se" />
        <Tab eventKey={5} title="5- Regra da Vida" />
        <Tab eventKey={6} title="6- Retiro Anual" />
      </Tabs>
      <br />
      <br />
      <div>
        {pce == 1 ? (
          <div>
            <SubTitle>Escuta da Palavra</SubTitle>
            <p>
              “A Palavra de Deus é viva e eficaz.” (Hb 4, 12) Deus fala pelas
              Escrituras, pela Criação, pelas suas intervenções na história
              humana, pelos outros, pelos Profetas e sobretudo pelo Seu filho,
              Jesus.
            </p>
            <p>
              A escuta regular da Palavra de Deus permite não somente conhecer a
              Deus mas enraizarmo-nos melhor no Evangelho fazendo com que cada
              membro do casal entre em contato direto com a pessoa de Cristo. E
              esse contato é o pilar de toda a vida espiritual. A palavra
              criadora de Deus é sempre fonte indispensável de motivação e de
              energia para o nosso crescimento pessoal, para o nosso crescimento
              como casal e para a construção de um mundo melhor. Por isso as ENS
              convidam cada um a ouvir, diariamente, a Palavra de Deus,
              reservando um tempo para ler uma passagem da Bíblia, em particular
              dos Evangelhos, e refletir sobre ela em silêncio para melhor
              compreendermos o que Deus nos diz.
            </p>
            <ImageDiv>
              <ImagePCE src={Pce1} />
            </ImageDiv>
          </div>
        ) : pce == 2 ? (
          <div>
            <SubTitle>Meditação</SubTitle>
            <p>
              “Sede perseverantes e vigilantes na oração, acompanhada de ações
              de graças.” (Col 4, 2)
            </p>
            <p>
              Somos chamados a dar o nosso tempo ao Senhor, para uma conversa
              pessoal com Ele e viver a sua presença.
            </p>
            <p>
              Um tempo quotidiano de oração desenvolve em nós a capacidade de
              escuta e de diálogo com Deus que permite que tomemos consciência
              do que somos, é um tempo de descoberta e de acolhimento do projeto
              concreto que Deus tem para nós como pessoa e como casal.
            </p>
            <p>
              Não existem regras rígidas para rezar. Cada pessoa decide o que é
              apropriado para si (quando, onde e como). O mais importante para
              desenvolver essa profunda união com Deus parece ser a perseverança
              e a regularidade.
            </p>
            <ImageDiv>
              <ImagePCE src={Pce2} />
            </ImageDiv>
          </div>
        ) : pce == 3 ? (
          <div>
            <SubTitle>Oração Conjugal</SubTitle>
            <p>
              “Eu neles e tu em mim, para que sejam perfeitos na unidade.” (Jo
              17, 23)
            </p>
            <p>
              Cristo está presente de uma maneira muito especial quando os
              esposos rezam juntos. Não somente renovam o seu “sim” a Deus, mas
              atingem essa unidade profunda que só se consegue através da união
              dos corações e dos espíritos no sacramento do Matrimónio.
            </p>
            <p>
              A oração conjugal torna-se a expressão comum de duas orações
              individuais e deve nascer naturalmente de uma vida Partilhada. Se
              cada um dos esposos tem o seu estilo de oração, é importante que
              tentem desenvolver uma maneira comum de rezar, para descobrir e
              viver uma nova dimensão da sua vida conjugal. A sua oração em
              comum será mais fácil, mais autêntica e profunda quando a escuta
              da Palavra de Deus e a oração silenciosa forem uma prática regular
              nas suas vidas.
            </p>
            <p>
              O Magnificat, a oração de todas as Equipas de Nossa Senhora, pode
              fazer parte dessa prece quotidiana.
            </p>
            <p>
              Quando o casal tem filhos, é importante que um tempo seja
              reservado para a oração em família. O casal é, para os filhos, o
              primeiro lugar de aprendizagem. Cabe aos pais transmitir-lhes a fé
              e agir de tal maneira que a sua casa seja um lugar onde eles se
              sintam bem a rezar, por exemplo um momento de oração antes da
              refeição.
            </p>
            <ImageDiv>
              <ImagePCE src={Pce3} />
            </ImageDiv>
          </div>
        ) : pce == 4 ? (
          <div>
            <SubTitle>Dever de Sentar-se</SubTitle>
            <p>“Sujeitai-vos uns aos outros no temor de Cristo.” (Ef 5, 21)</p>
            <p>
              O Dever de se Sentar-se ajuda-nos a revelarmo-nos, pouco a pouco,
              ao nosso cônjuge.
            </p>
            <p>
              É um tempo que marido e mulher passam juntos, sob o olhar do
              Senhor, para dialogar com sinceridade, num ambiente tranquilo.
              Esse tempo de manifestação dos sentimentos e dos pensamentos entre
              marido e mulher permite um melhor conhecimento e uma ajuda mútua.
            </p>
            <p>
              Permite também fazer um balanço do passado, analisar a vida
              conjugal e familiar, fazer planos para o futuro e conversar sobre
              o projeto que escolheram.
            </p>
            <p>
              O Dever de se Sentar-se evita a rotina da vida conjugal e mantém
              jovem e vivo o amor e o casamento. O seu valor é apreciado por
              todos os casais que o praticam, que reconhecem nesse encontro uma
              oportunidade para se amarem ainda mais.
            </p>
            <p>
              É sempre bom começar o Dever de se Sentar-se com um tempo de
              oração ou de silêncio para tomar consciência da presença de Deus.
              O silêncio aprofunda o olhar de um sobre o outro, aproxima de Deus
              e cria uma atmosfera favorável.
            </p>
            <ImageDiv>
              <ImagePCE src={Pce4} />
            </ImageDiv>
          </div>
        ) : pce == 5 ? (
          <div>
            <SubTitle>Regra de Vida</SubTitle>
            <p>
              “Procurai fazer sempre o bem diante de todos os homens.” (Rom 12,
              17)
            </p>
            <p>
              A Regra de Vida consiste em fixar o/os pontos sobre os quais cada
              membro do casal decide pessoalmente concentrar os seus esforços
              para seguir melhor a sua direção de crescimento e responder com
              alegria ao apelo que o amor de Deus lhe dirige.
            </p>
            <p>
              Escolher e assumir uma Regra de Vida ajuda cada um a aderir mais
              pessoalmente e de maneira concreta ao projeto que Deus tem para
              cada cônjuge e para o casal. É uma atitude ou diversas atitudes
              práticas que se tomam para progredir no crescimento espiritual e
              humano. Não se trata de querer multiplicar obrigações, mas de
              melhorar, pouco a pouco, com tenacidade, alguns dos pontos fracos
              ou de reforçar algumas qualidades.
            </p>
            <p>
              Através da reflexão sobre os aspectos da vida pessoal, conjugal,
              familiar, cada um deve procurar a verdade sobre si mesmo, a fim de
              encontrar aquilo que se opõe à vontade de Deus. Como se trata de
              um caminho espiritual, o avanço não é linear e é preciso estar
              sempre a recomeçar. Esta regra deve ser regularmente revista.
            </p>
            <ImageDiv>
              <ImagePCE src={Pce5} />
            </ImageDiv>
          </div>
        ) : (
          <div>
            <SubTitle>Retiro Anual</SubTitle>
            <p>
              “Vinde à parte para um lugar despovoado e descansai um pouco”. (Mc
              6, 31)
            </p>
            <p>
              É fundamental reservar todos os anos um tempo suficiente para se
              isolar diante do Senhor, em casal, num retiro que permita uma
              reflexão sobre a sua vida, na presença de Deus.
            </p>
            <p>
              O Retiro é um tempo privilegiado de paragem, de escuta, de oração
              e uma oportunidade de renovação espiritual. É também um tempo
              forte para se voltar para dentro de si mesmo e fazer uma revisão
              geral de vida, sobretudo sobre o seu caminho de crescimento.
            </p>
            <p>
              É, muitas vezes, uma possibilidade de melhorar o conhecimento do
              pensamento divino, que é entendido de uma maneira fragmentada ou
              sumária, nas leituras da Palavra e na vida do dia a dia.
            </p>
            <p>
              Os casais das Equipas de Nossa Senhora são encorajados a tirar
              proveito da atmosfera especial dos retiros para se renovarem. São
              convidados a deixar os locais onde vivem e onde trabalham para que
              possam escutar Deus e entender o plano que Ele tem para o casal.
            </p>
            <ImageDiv>
              <ImagePCE src={Pce6} />
            </ImageDiv>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Pce;
