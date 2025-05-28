"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface RankingItem {
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

export interface RankingData {
  rankingList: RankingItem[];
  acessos: number;
  inscricoes: number;
  posicao: number;
}

// Função para gerar inteiros aleatórios entre min e max (inclusive)
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RankingDataContext = createContext<RankingData | null>(null);

export const RankingDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const currentUsername = searchParams.get("username") || "Você";
  const [data, setData] = useState<RankingData | null>(null);

  useEffect(() => {
    // Lista de nomes possíveis para participantes (excluindo o usuário atual)
    const possibleNames = [
      "André Souza",
      "Melissa Loures",
      "Rodrigo Gonçalves",
      "Carlos Silva",
      "Fernanda Almeida",
      "Pedro Souza",
    ].filter((name) => name !== currentUsername);

    // Seleciona 2 participantes aleatórios
    const fakeParticipants: RankingItem[] = [];
    const namesPool = [...possibleNames];
    while (fakeParticipants.length < 2 && namesPool.length > 0) {
      const randomIndex = getRandomInt(0, namesPool.length - 1);
      fakeParticipants.push({
        name: namesPool[randomIndex],
        score: 0, // placeholder
      });
      namesPool.splice(randomIndex, 1);
    }

    /* 
      Para garantir que fique em 1ª posição, faremos o seguinte:
      - Geramos o score do usuário atual em um intervalo alto (por exemplo, 900 a 1000).
      - Geramos os scores dos participantes fictícios em um intervalo menor que o score.
    */
    const currentUserScore = getRandomInt(900, 1000);
    const updatedFakeParticipants = fakeParticipants.map((p) => ({
      ...p,
      score: getRandomInt(700, currentUserScore - 1),
    }));

    const currentUser: RankingItem = {
      name: currentUsername,
      score: currentUserScore,
      isCurrentUser: true,
    };

    // Junta os participantes e ordena do maior para o menor
    const rankingList = [...updatedFakeParticipants, currentUser].sort(
      (a, b) => b.score - a.score
    );

    // Calcula a posição do usuário (deve ser 1, pois seu score é o maior)
    const posicao = rankingList.findIndex((item) => item.isCurrentUser) + 1;

    // Gera valores aleatórios para outros dados (acessos e inscrições)
    const acessos = getRandomInt(900, 1500);
    // Como exemplo, podemos definir as inscrições como o score do usuário
    const inscricoes = currentUserScore;

    setData({
      rankingList,
      acessos,
      inscricoes,
      posicao,
    });
  }, [currentUsername]);

  return (
    <RankingDataContext.Provider value={data}>
      {children}
    </RankingDataContext.Provider>
  );
};

export const useRankingDataContext = () => {
  return useContext(RankingDataContext);
};
