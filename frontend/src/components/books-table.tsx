import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoPolls from "./no-books";
import { useRouter } from "next/navigation";

const BooksTable = ({ books }: { books: Book[] }) => {
  const router = useRouter();

  if (books.length === 0) {
    return <NoPolls />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="hidden md:table-cell">Author</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book, i) => (
          <TableRow
            className="hover:cursor-pointer"
            key={i}
            onClick={() => {
              router.push(`/books/${book.id}`);
            }}
          >
            <TableCell className="font-medium">{book.id}</TableCell>
            <TableCell className="text-center">{book.title}</TableCell>
            <TableCell className="hidden md:table-cell">
              {book.author.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BooksTable;
