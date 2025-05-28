import { FC } from "react";
import LeftSection from "./components/LeftSection";
import RankingSection from "./components/RankingSection";
import { RankingDataProvider } from "./components/RankingDataContext";

const Evento: FC = () => {
  return (
    <div className="min-h-screen">
      <main className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center py-10 px-4 md:px-6 lg:py-0 lg:px-8 gap-12 lg:gap-32 animate-fadeIn">
        <RankingDataProvider>
          <LeftSection />
          <RankingSection />
        </RankingDataProvider>
      </main>
    </div>
  );
};

export default Evento;
