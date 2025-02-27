import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BooksTable from "@/components/books-table";
import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      books {
        id
        title
        publishedDate
        description
        author {
          name
        }
      }
    }
  }
`;

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return `Loading...`;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Books</CardTitle>
        <CardDescription>Manage your books and their authors.</CardDescription>
      </CardHeader>
      <CardContent>
        <BooksTable books={data.books.books} />
      </CardContent>
    </Card>
  );
};

export default Books;
