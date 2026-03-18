"use client";

import { createContext, useContext, useState } from "react";

import type { IProps, IWord, IWordContext } from "./interfaces";

export const WordContext = createContext({} as IWordContext);

const WordProvider = ({ children }: IProps) => {
  const [wordsList, setWordsList] = useState<IWord[] | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      return JSON.parse(localStorage.getItem("words") ?? "null");
    } catch {
      return null;
    }
  });
  const [modal, setModal] = useState<boolean>(false);

  const handleAddItemOnWordsList = (word: IWord): void => {
    const list = [...(wordsList || []), word];

    localStorage.setItem("words", JSON.stringify(list));

    setWordsList(list);
  };

  const handleModal = (active: boolean): void => setModal(active);

  return (
    <WordContext.Provider
      value={{ handleAddItemOnWordsList, handleModal, wordsList, modal }}
    >
      {children}
    </WordContext.Provider>
  );
};

export const useWord = () => useContext(WordContext);

export default WordProvider;
