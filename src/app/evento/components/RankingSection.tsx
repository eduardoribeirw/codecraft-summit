"use client";
import { FC } from "react";
import RankingItem from "./RankingItem";
import medalOuro from "../assets/medal-1.svg";
import medalPrata from "../assets/medal-2.svg";
import medalBronze from "../assets/medal-3.svg";
import { useRankingDataContext } from "./RankingDataContext";

export interface RankingItemData {
  position: number;
  name: string;
  score: number;
  medal: string;
  alt: string;
  isCurrentUser: boolean;
}

const RankingSection: FC = () => {
  const rankingData = useRankingDataContext();
  if (!rankingData) return null;

  // Mapeia os itens do ranking para mostrar as medalhas e as posições
  const finalRanking = rankingData.rankingList.map((item, index) => ({
    position: index + 1,
    name: item.name,
    score: item.score,
    medal: index === 0 ? medalOuro : index === 1 ? medalPrata : medalBronze,
    alt:
      index === 0
        ? "Medalha de 1° lugar"
        : index === 1
        ? "Medalha de 2° lugar"
        : "Medalha de 3° lugar",
    isCurrentUser: item.isCurrentUser || false,
  }));

  return (
    <section className="flex flex-col gap-5 w-full max-w-full sm:max-w-[27.43rem] animate-slideInRight">
      <h1 className="text-xl text-[#C8D0DA] font-semibold font-['oxanium'] leading-[100%] text-center lg:text-left">
        Ranking de indicações
      </h1>
      <div className="flex flex-col gap-4 w-full">
        {finalRanking.map((item) => (
          <RankingItem key={item.position} data={item} />
        ))}
      </div>
    </section>
  );
};

export default RankingSection;
