import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import NoAuthors from "./no-authors";

const AuthorsTable = ({ authors }: { authors: Author[] }) => {
  const router = useRouter();

  if (authors.length === 0) {
    return <NoAuthors />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Birthday</TableHead>
          <TableHead className="hidden lg:table-cell">Biography</TableHead>
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
            <TableCell className="font-medium">{author.name}</TableCell>
            <TableCell>{author.bornDate}</TableCell>
            <TableCell className="hidden lg:table-cell">
              {author.biography}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuthorsTable;
