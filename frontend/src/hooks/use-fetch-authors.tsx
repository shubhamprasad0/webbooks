import { gql, useQuery } from "@apollo/client";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      totalCount
      last
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
  const { loading, error, data } = useQuery(GET_AUTHORS);
  return {
    loading,
    error,
    authors: !loading && !error ? data.authors.authors : [],
    totalCount: !loading && !error ? data.authors.totalCount : 0,
    last: !loading && !error ? data.authors.last : 0,
  };
};

export default useFetchAuthors;
