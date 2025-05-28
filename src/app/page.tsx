import { RegistrationForm } from "@/app/components/registration-form";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineStatusOnline } from "react-icons/hi";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center text-center lg:text-left py-10 lg:py-0">
      <div className="flex flex-col gap-5 lg:gap-8 items-center lg:items-start">
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
        <div className="flex flex-col font-['oxanium'] text-4xl lg:text-7xl font-medium">
          <h1 className="text-[#6F9DE2] ">CodeCraft</h1>
          <h2 className="text-[#DAE4F2]">Summit 2025</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-auto h-auto lg:w-[41.56rem] lg:h-[18rem] bg-[#191D24] rounded-[0.9375rem] border border-[#21252C]">
            <div className="m-8 flex flex-col gap-6">
              <div className="flex justify-between">
                <h1 className="text-[#C8D0DA] font-['oxanium'] font-semibold text-xl">
                  Sobre o evento
                </h1>
                <div className="text-[#9871F3] flex items-center gap-2 text-xs font-semibold font-['montserrat']">
                  <HiOutlineStatusOnline size={20} />
                  AO VIVO
                </div>
              </div>
              <p className="w-[18.75rem] lg:w-auto text-[#95A1B1] leading-[160%] text-left text-sm lg:text-base">
                Um evento feito por e para pessoas desenvolvedoras apaixonadas
                por criar soluções inovadoras e compartilhar conhecimento. Vamos
                mergulhar nas tendências mais recentes em desenvolvimento de
                software, arquitetura de sistemas e tecnologias emergentes, com
                palestras, workshops e hackathons. <br /> <br /> Dias 15 a 17 de
                março | Das 18h às 21h | Online & Gratuito
              </p>
            </div>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
