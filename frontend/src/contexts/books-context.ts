import { createContext, Dispatch, SetStateAction } from "react";

interface BooksContextType {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

export const BooksContext = createContext<BooksContextType | null>(null);
