"use client";
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { LuCopy, LuBadgeCheck } from "react-icons/lu";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);
  const linkToCopy = "devstage.com/codecraft-summit-2025/1289";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao copiar o link:", error);
    }
  };

  return (
    <div className="w-full lg:w-[34.93rem] h-12 bg-[#13161B] border border-[#21252C] rounded-[0.625rem] text-[#DAE4F2] flex items-center">
      <div className="ml-4 lg:w-full flex items-center justify-between gap-2 leading-[160%]">
        <div className="flex items-center gap-2">
          <IoIosLink size={22} />
          <p className="truncate sm:overflow-visible sm:whitespace-normal sm:max-w-full max-w-[245px]">
            {linkToCopy}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className={`w-9 h-9 grid place-items-center rounded-md ml-3 lg:ml-0 lg:mr-2 transition-colors duration-300 ${
            copied
              ? "bg-green-500 text-green-100"
              : "bg-[#2A313C] text-[#6F9DE2]"
          }`}
        >
          {copied ? <LuBadgeCheck size={18} /> : <LuCopy size={18} />}
        </button>
      </div>
    </div>
  );
}
