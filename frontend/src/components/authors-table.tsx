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

const AuthorsTable = ({ authors }: { authors: Author[] }) => {
  const router = useRouter();

  if (authors.length === 0) {
    return <NoPolls />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="hidden md:table-cell">Birthday</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {authors.map((author, i) => (
          <TableRow
            className="hover:cursor-pointer"
            key={i}
            onClick={() => {
              router.push(`/authors/${author.id}`);
            }}
          >
            <TableCell className="font-medium">{author.id}</TableCell>
            <TableCell className="text-center">{author.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {author.bornDate}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuthorsTable;
