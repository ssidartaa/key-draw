import { ReactNode } from "react";

export type ITheme = "light" | "dark";

export interface IWord {
  id: string;
  text: string;
  createdAt: Date;
}

export interface IProps {
  children: ReactNode;
}

export interface IWordContext {
  handleModal: (active: boolean, word?: IWord) => void;
  handleAddItemOnWordsList: (word: IWord) => void;
  handleWining: (word: IWord) => void;
  handleRemoveWord: (id: string) => void;

  modal: boolean;
  modalWord: IWord | null;
  wordsList: IWord[];
  winingWord: IWord | null;
}
