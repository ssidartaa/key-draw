"use client";

import { Pencil, Trash } from "lucide-react";

import { useWords } from "@/contexts/layout";

const WordsList = () => {
  const { wordsList, winingWord, handleRemoveWord, handleModal } = useWords();

  if (!wordsList?.length && !winingWord) return null;

  return (
    <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
      <div>
        {winingWord && (
          <p className="font-bold truncate">
            Última palavra sorteada:
            <span className="font-normal">{` ${winingWord.text}`}</span>
          </p>
        )}
      </div>

      {!!wordsList.length && (
        <ul className="flex flex-col gap-2 order-2 pr-2 max-h-43 overflow-y-auto">
          {wordsList.map((word) => (
            <li
              key={word.id}
              className="flex justify-between items-center gap-5 px-4 py-2 border border-foreground/40 rounded-md"
            >
              <span className="truncate">{word.text}</span>

              <div className="flex items-center gap-2">
                <button
                  tabIndex={-1}
                  type="button"
                  onClick={() => handleModal(true, word)}
                  className="hover:bg-foreground/10 p-2 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <Pencil size={18} />
                </button>

                <button
                  tabIndex={-1}
                  type="button"
                  onClick={() => handleRemoveWord(word.id)}
                  className="hover:bg-foreground/10 p-2 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <Trash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WordsList;
