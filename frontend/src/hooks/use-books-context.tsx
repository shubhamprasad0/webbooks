import { BooksContext } from "@/contexts/books-context";
import { useContext } from "react";

const useBooksContext = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    throw new Error(
      "useBooksContext has to be used with BooksContext.Provider"
    );
  }

  return booksContext;
};

export default useBooksContext;
