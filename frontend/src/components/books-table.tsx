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

const BooksTable = ({ books }: { books: Book[] }) => {
  const router = useRouter();

  if (books.length === 0) {
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
        {books.map((book, i) => (
          <TableRow
            className="hover:cursor-pointer"
            key={i}
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
