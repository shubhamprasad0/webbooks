import { gql, useQuery } from "@apollo/client";
import useBooksContext from "./use-books-context";
import { useEffect } from "react";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      books {
        id
        title
        author {
          name
        }
      }
    }
  }
`;

const useFetchBooks = () => {
  const { books, setBooks } = useBooksContext();
  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (!loading && !error) {
      setBooks(data.books.books);
    }
  }, [data, setBooks, loading, error]);

  return {
    loading,
    error,
    books,
    setBooks,
  };
};

export default useFetchBooks;
