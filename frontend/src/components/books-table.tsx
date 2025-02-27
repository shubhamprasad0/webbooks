import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import NoBooks from "./no-books";
import { gql, useQuery } from "@apollo/client";
import { Button } from "./ui/button";

const GET_BOOKS = gql`
  query GetBooks($limit: Int, $cursor: ID) {
    books(limit: $limit, cursor: $cursor) {
      books {
        id
        title
        publishedDate
        description
        author {
          name
        }
      }
      last
      totalCount
    }
  }
`;

const BooksTable = () => {
  const router = useRouter();

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS, {
    variables: {
      limit: 10,
      cursor: 0,
    },
  });

  if (loading) {
    return `Loading...`;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  if (data.books.books.length === 0) {
    return <NoBooks />;
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        cursor: data.books.last,
      },
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Author</TableHead>
            <TableHead className="hidden md:table-cell">Publish Date</TableHead>
            <TableHead className="hidden lg:table-cell">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.books.books.map((book: Book) => (
            <TableRow
              className="hover:cursor-pointer"
              key={book.id}
              onClick={() => {
                router.push(`/books/${book.id}`);
              }}
            >
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell className="text-center">{book.author.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {book.publishedDate}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {book.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        {data.books.books.length < data.books.totalCount && (
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BooksTable;
