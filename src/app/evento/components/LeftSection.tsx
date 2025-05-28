"use client";
import { FC } from "react";
import Image from "next/image";
import { LuMousePointerClick, LuBadgeCheck, LuMedal } from "react-icons/lu";
import StatsCard from "./StatsCard";
import dynamic from "next/dynamic";
import { useRankingDataContext } from "./RankingDataContext";
import Link from "next/link";

const CopyLinkNoSSR = dynamic(() => import("./CopyLink"), {
  ssr: false,
});

const LeftSection: FC = () => {
  const rankingData = useRankingDataContext();
  if (!rankingData) return null;

  return (
    <section className="flex flex-col gap-8 lg:gap-16 items-center lg:items-start max-w-full lg:max-w-[600px] animate-slideInLeft">
      <Link href="/">
        <Image
          className="w-[5.425rem] h-[1.5rem] lg:w-[6.78125rem] lg:h-[1.875rem]"
          src="/logo-1.svg"
          width={109}
          height={30}
          alt="Logo do evento"
          priority
        />
      </Link>

      <div className="text-center lg:text-left w-full">
        <h2 className="text-[#DAE4F2] text-3xl sm:text-4xl lg:text-7xl font-medium font-['oxanium'] animate-fadeIn">
          Inscrição Confirmada!
        </h2>
        <p className="text-[#95A1B1] leading-[160%] mt-2 text-sm sm:text-base">
          Para entrar no evento, acesse o link enviado para seu e-mail.
        </p>
      </div>

      <div className="flex flex-col w-full animate-fadeInUp">
        <h2 className="text-[#DAE4F2] text-base lg:text-xl font-bold font-['oxanium'] text-center lg:text-left">
          Indique e Ganhe
        </h2>
        <p className="text-[#95A1B1] leading-[160%] mt-3 text-sm sm:text-base text-center lg:text-left">
          Convide mais pessoas para o evento e concorra a prêmios exclusivos!
          <br className="hidden sm:block" />É só compartilhar o link abaixo e
          acompanhar as inscrições:
        </p>

        <div className="mt-6 w-full max-w-[450px] mx-auto lg:mx-0">
          <CopyLinkNoSSR />
        </div>

        {/* Cartões de estatísticas com dados centralizados */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 w-full">
          <StatsCard
            icon={<LuMousePointerClick size={20} className="text-[#9871F3]" />}
            value={`${rankingData.acessos}`}
            label="Acessos ao link"
          />
          <StatsCard
            icon={<LuBadgeCheck size={20} className="text-[#9871F3]" />}
            value={`${rankingData.inscricoes}`}
            label="Inscrições feitas"
          />
          <StatsCard
            icon={<LuMedal size={20} className="text-[#9871F3]" />}
            value={`${rankingData.posicao}°`}
            label="Posição no ranking"
          />
        </div>
      </div>
    </section>
  );
};

export default LeftSection;
