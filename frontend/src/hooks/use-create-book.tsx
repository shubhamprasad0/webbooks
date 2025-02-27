import { gql, useMutation } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $publishedDate: Date!
    $author: AuthorInput!
  ) {
    createBook(
      title: $title
      description: $description
      publishedDate: $publishedDate
      author: $author
    ) {
      id
      title
      description
      publishedDate
      author {
        id
        name
        biography
        bornDate
      }
    }
  }
`;

const useCreateBook = () => {
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK);
  return {
    loading,
    error,
    createBook,
  };
};

export default useCreateBook;
