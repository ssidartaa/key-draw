"use client";

import { Plus } from "lucide-react";

import { useWord } from "@/contexts/layout";

import cn from "@/utils/className";

const MainCard = () => {
  const { handleModal, modal } = useWord();

  return (
    <div className="flex flex-col gap-10 shadow-md p-5 px-8 border-2 border-foreground rounded-lg w-full h-1/2">
      <div className="flex justify-between items-center gap-5">
        <h1 className="font-bold text-base md:text-2xl xl:text-3xl">
          Sorteio de Palavras
        </h1>

        <button
          tabIndex={-1}
          type="button"
          className={cn(
            "hover:bg-foreground/10 p-2 rounded-full hover:text-foreground/70 transition-all duration-300 cursor-pointer transform",
            modal ? "rotate-45" : "rotate-0",
          )}
        >
          <Plus
            onClick={() => handleModal(!modal)}
            className="w-4 md:w-6 h-4 md:h-6"
          />
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default MainCard;
