"use client";
import React, { FC, ReactNode, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { BooksContext } from "../contexts/books-context";
import { AuthorsContext } from "../contexts/authors-context";

const ContextProviders: FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  return (
    <ApolloProvider client={client}>
      <AuthorsContext.Provider value={{ authors, setAuthors }}>
        <BooksContext.Provider value={{ books, setBooks }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </BooksContext.Provider>
      </AuthorsContext.Provider>
    </ApolloProvider>
  );
};

export default ContextProviders;
