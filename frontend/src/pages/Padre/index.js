import React from 'react';

import { Container } from './styles';

import Title from '../../components/Title';

function Padre() {
  return (
    <Container>
      <Title>Padre Caffarel</Title>
      <p>
        O movimento iniciou-se em Paris, em 1939, fundado pelo Padre Henri
        Caffarel. Durante a Segunda Guerra Mundial o movimento se expandiu e é
        criada a revista "L'Anneau d'Or" que divulga a experiência das pequenas
        equipes e sua espiritualidade.
      </p>
      <p>
        Em 1947 o movimento se organiza e é elaborado um documento fundador: a
        "Carta das Equipes de Nossa Senhora", ou mais conhecido por "Estatutos",
        que contém os pontos essenciais que cada casal, membro das ENS, deve
        seguir.
      </p>
      <p>
        De 1950 a 1969 o movimento se expande. Primeiro ultrapassa as fronteiras
        da França, constituindo-se na Bélgica e na Suíça. Chega ao Brasil e à
        Luxemburgo em 1950; em 1953 às Ilhas Mauricio e Senegal; 1955 à Espanha
        e ao Canadá; 1956 à Inglaterra; 1955 à Portugal; 1958 à Alemanha e
        Estados Unidos; 1959 à Áustria e Itália; 1961 à Austrália e Colômbia;
        1962 à Madagascar e Vietnam; em 1963 ao Líbano e Irlanda; em 1968 Japão
        e África francesa e em 1969 à Índia. Diante desta expansão, optou-se por
        manter o movimento como um único movimento mundial de caráter
        internacional.
      </p>
      <p>
        Em 1975, as Equipes de Nossa Senhora são reconhecidas por Roma como uma
        "Associação Internacional Católica" - carta do Cardeal Roy, Presidente
        do Pontifício Conselho para os Leigos.
      </p>
      <p>
        Em 1976, a "Carta das Equipes de Nossa Senhora" é revista por uma equipe
        responsável, que elabora o documento definitivo: "O que é uma Equipe de
        Nossa Senhora". Esta é a principal referência para as Equipes de todo o
        mundo. Neste mesmo ano, no Encontro Internacional de Roma nascem as
        Equipes Jovens de Nossa Senhora.
      </p>
      <p>
        Em 1992 o Pontifício Conselho para os Leigos reconhece as Equipes de
        Nossa Senhora como Associação de Fiéis de Direito Privado e seus
        estatutos são reconhecidos "ad experimentum", isto é, em regime
        probatório.
      </p>
      <p>
        No dia 26 de julho de 2002, festa de Sant'Ana e São Joaquim, o
        Pontifício Conselho para os Leigos reconheceu definitivamente as Equipes
        de Nossa Senhora como Movimento de Fiéis Leigos.
      </p>

      <p className="subtitulo">Para mais informações (Fonte):</p>
      <p>
        (Fonte:{' '}
        <a
          href="https://pt.wikipedia.org/wiki/Equipes_de_Nossa_Senhora"
          target="_blank"
        >
          {' '}
          Wikipédia
        </a>
        )
      </p>
      <p>
        (Fonte:{' '}
        <a
          href="http://www.henri-caffarel.org/pages_pt/index.html"
          target="_blank"
        >
          {' '}
          Site Oficial
        </a>
        )
      </p>
      <p>
        (Fonte:{' '}
        <a
          href="http://www.ens.org.br/novo/causa-de-canonizacao-do-pe-henri-caffarel/oracao-de-canonizacao-do-pe-henri-caffarel"
          target="_blank"
        >
          {' '}
          Oração de canonização
        </a>
        )
      </p>
      <p>
        (Fonte:{' '}
        <a
          href="http://www.ens.org.br/novo/causa-de-canonizacao-do-pe-henri-caffarel/principais-publicacoes-do-pe-henri-caffarel"
          target="_blank"
        >
          {' '}
          Principais publicações do Pe. Henri Caffarel
        </a>
        )
      </p>
      <p>
        (Fonte:{' '}
        <a
          href="http://www.equipes-notre-dame.com/pt-pt/as-equipas-de-nossa-senhora/quem-somos/o-padre-caffarel-fundador"
          target="_blank"
        >
          {' '}
          ENS Mundial|Pe. Caffarel
        </a>
        )
      </p>
    </Container>
  );
}

export default Padre;
