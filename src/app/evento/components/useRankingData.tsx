import { useState, useEffect } from "react";
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

// Função auxiliar para gerar inteiros aleatórios entre min e max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const useRankingData = (): RankingData | null => {
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

    // Seleciona 2 participantes aleatórios dessa lista
    const fakeParticipants: RankingItem[] = [];
    const namesPool = [...possibleNames]; // Changed 'let' to 'const' here
    while (fakeParticipants.length < 2 && namesPool.length > 0) {
      const randomIndex = getRandomInt(0, namesPool.length - 1);
      fakeParticipants.push({
        name: namesPool[randomIndex],
        score: getRandomInt(700, 1100), // scores entre 700 e 1100 para os fictícios
      });
      namesPool.splice(randomIndex, 1);
    }

    // Gera o score do usuário atual, garantindo coerência (ex: entre 800 e 1000)
    const currentUserScore = getRandomInt(800, 1000);
    const currentUser: RankingItem = {
      name: currentUsername,
      score: currentUserScore,
      isCurrentUser: true,
    };

    // Junta os participantes e ordena do maior para o menor (ranking)
    const rankingList = [...fakeParticipants, currentUser].sort(
      (a, b) => b.score - a.score
    );
    // Determina a posição do usuário atual (índice + 1)
    const posicao = rankingList.findIndex((item) => item.isCurrentUser) + 1;

    /*  
      Para manter a coerência:
      - Os "acessos" ao link serão um valor aleatório, geralmente maior que o número de inscrições.
      - As "inscrições feitas" serão definidas igual ao score do usuário (ou você pode optar por outra lógica).
    */
    const acessos = getRandomInt(900, 1500);
    const inscricoes = currentUserScore;

    setData({
      rankingList,
      acessos,
      inscricoes,
      posicao,
    });
  }, [currentUsername]);

  return data;
};
