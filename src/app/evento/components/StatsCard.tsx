import React, { FC, ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

/**
 * Um componente de cartão para exibir uma estatística.
 * Utiliza React.memo para evitar re-renderizações desnecessárias.
 */
const StatsCard: FC<StatsCardProps> = React.memo(({ icon, value, label }) => {
  return (
    <div className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[11rem] h-[6.125rem] bg-[#191D24] border border-[#21252C] rounded-lg flex flex-col items-center justify-center p-3 transition-all duration-300 hover:border-[#9871F3]/50 hover:scale-[1.02]">
      <div className="absolute left-0 top-0 m-3">{icon}</div>
      <h1 className="font-['oxanium'] text-[#C8D0DA] text-2xl font-semibold">
        {value}
      </h1>
      <p className="text-sm text-[#95A1B1] mt-1 text-center">{label}</p>
    </div>
  );
});

StatsCard.displayName = "StatsCard";

export default StatsCard;
