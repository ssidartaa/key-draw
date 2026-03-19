"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { v4 as UUIDV4 } from "uuid";

import { useWords } from "@/contexts/layout";

import ThemeSlider from "@/components/themeSlider";
import MainCard from "@/components/mainCard";
import Modal from "@/components/modal";

import cn from "@/utils/className";

const Home = () => {
  const { theme } = useTheme();
  const { handleModal, handleAddItemOnWordsList, modal, modalWord } =
    useWords();

  const [text, setText] = useState<string>("");

  const isDark = theme === "dark";

  useEffect(() => {
    if (!modalWord) return;
    (() => {
      setText(modalWord?.text ?? "");
    })();
  }, [modalWord, setText]);

  return (
    <>
      <div className="relative flex justify-center items-center mx-auto p-5 h-screen container">
        <ThemeSlider />

        <MainCard />
      </div>

      <Modal
        title="Inserir uma palavra nova:"
        isOpen={modal}
        onClose={() => {
          handleModal(false);
          setText("");
        }}
      >
        <form className="flex flex-col gap-5">
          <input
            value={text}
            placeholder="Palavra a ser sorteada"
            onChange={({ target: { value } }) => setText(value)}
            className="bg-background shadow-sm px-3 py-2 border border-foreground/30 rounded-md outline-none w-full text-foreground text-sm"
          />

          <div className="gap-5 grid grid-cols-2">
            <button
              tabIndex={-1}
              type="button"
              disabled={!text.trim()}
              onClick={() => {
                handleAddItemOnWordsList({
                  id: UUIDV4(),
                  text,
                  createdAt: new Date(),
                });

                handleModal(false);
                setText("");
              }}
              className="bg-primary hover:bg-primary/70 disabled:hover:bg-primary disabled:opacity-50 px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            >
              Inserir
            </button>

            <button
              tabIndex={-1}
              type="button"
              disabled={!text}
              onClick={() => setText("")}
              className={cn(
                "hover:bg-foreground/10 disabled:hover:bg-transparent disabled:opacity-50 px-4 py-2 border border-foreground/30 rounded-md font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed",
                isDark ? "text-white" : "text-foreground",
              )}
            >
              Limpar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
