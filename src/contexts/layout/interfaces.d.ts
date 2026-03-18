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
  handleAddItemOnWordsList: (word: IWord) => void;
  handleModal: (active: boolean) => void;

  wordsList: IWord[] | null;
  modal: boolean;
}
