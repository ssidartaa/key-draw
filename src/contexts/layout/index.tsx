"use client";

import { createContext, useContext, useState } from "react";

import type { IProps, IWord, IWordContext } from "./interfaces";

export const WordContext = createContext({} as IWordContext);

const WordProvider = ({ children }: IProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalWord, setModalWord] = useState<IWord | null>(null);
  const [wordsList, setWordsList] = useState<IWord[]>(() => {
    if (typeof window === "undefined") return null;

    try {
      return JSON.parse(localStorage.getItem("words") ?? "null");
    } catch {
      return null;
    }
  });
  const [winingWord, setWiningWord] = useState<IWord | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      return JSON.parse(localStorage.getItem("winingWord") ?? "null");
    } catch {
      return null;
    }
  });

  const handleModal = (active: boolean, word?: IWord): void => {
    setModal(active);

    if (!word) return;

    setModalWord(word);
  };

  const handleAddItemOnWordsList = (word: IWord): void => {
    const list = [...wordsList, word];

    localStorage.setItem("words", JSON.stringify(list));

    setWordsList(list);
  };

  const handleWining = (word: IWord): void => {
    handleRemoveWord(word.id);

    setWiningWord(word);

    localStorage.setItem("winingWord", JSON.stringify(word));
  };

  const handleRemoveWord = (id: string): void => {
    const formattedList = wordsList.filter((item) => item.id !== id);

    localStorage.setItem("words", JSON.stringify(formattedList));

    setWordsList(formattedList);
  };

  return (
    <WordContext.Provider
      value={{
        handleModal,
        handleAddItemOnWordsList,
        handleWining,
        handleRemoveWord,

        modal,
        modalWord,
        wordsList,
        winingWord,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export const useWords = () => useContext(WordContext);

export default WordProvider;
