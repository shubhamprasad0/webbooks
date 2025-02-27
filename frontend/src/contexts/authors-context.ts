import { createContext, Dispatch, SetStateAction } from "react";

interface AuthorsContextType {
  authors: Author[];
  setAuthors: Dispatch<SetStateAction<Author[]>>;
}

export const AuthorsContext = createContext<AuthorsContextType | null>(null);
