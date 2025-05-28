import Image from "next/image";
import React, { FC } from "react";
import { RankingItemData } from "./RankingSection";

interface RankingItemProps {
  data: RankingItemData;
}

/**
 * Componente que representa um item no ranking.
 * Utiliza memoização para melhorar o desempenho em re-renderizações.
 */
const RankingItem: FC<RankingItemProps> = React.memo(({ data }) => {
  return (
    <div className="w-full h-auto min-h-[6.625rem] bg-[#191D24] border border-[#21252C] rounded-lg flex items-center justify-between p-4 transition-all duration-300 hover:border-[#9871F3]/50 hover:scale-[1.01]">
      <div className="flex flex-col lg:ml-5">
        <h1 className="text-[#95A1B1] text-sm sm:text-base">
          <strong>{`${data.position}°`}</strong> | {data.name}
        </h1>
        <h2 className="font-['oxanium'] text-[#C8D0DA] text-xl sm:text-2xl font-semibold mt-2 flex items-center gap-2">
          <span>{data.score}</span>
          {data.isCurrentUser && (
            <span className="px-3 py-2 text-xs font-semibold text-[#95A1B1] bg-[#2A313C] rounded-md">
              Você
            </span>
          )}
        </h2>
      </div>
      <div className="w-[56px] h-[85px] relative flex items-center justify-center">
        <Image
          className="mb-8 mr-10"
          src={data.medal}
          width={56}
          height={85}
          alt={data.alt}
          priority
        />
      </div>
    </div>
  );
});

RankingItem.displayName = "RankingItem";

export default RankingItem;
