import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      totalCount
      last
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
  const { loading, error, data } = useQuery(GET_BOOKS);
  return {
    loading,
    error,
    books: !loading && !error ? data.books.books : [],
    totalCount: !loading && !error ? data.books.totalCount : 0,
    last: !loading && !error ? data.books.last : 0,
  };
};

export default useFetchBooks;
