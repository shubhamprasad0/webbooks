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

const BooksTable = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_BOOKS, {
    notifyOnNetworkStatusChange: true,
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

  return (
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
  );
};

export default BooksTable;
