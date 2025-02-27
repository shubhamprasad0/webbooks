import { gql, useQuery } from "@apollo/client";
import useAuthorsContext from "./use-authors-context";
import { useEffect } from "react";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      authors {
        id
        name
        biography
        bornDate
      }
    }
  }
`;

const useFetchAuthors = () => {
  const { authors, setAuthors } = useAuthorsContext();
  const { loading, error, data } = useQuery(GET_AUTHORS);

  useEffect(() => {
    if (!loading && !error) {
      setAuthors(data.authors.authors);
    }
  }, [data, loading, error, setAuthors]);

  return {
    loading,
    error,
    authors,
    setAuthors,
  };
};

export default useFetchAuthors;
