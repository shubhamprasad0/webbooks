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
import { gql, useQuery } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      authors {
        id
        name
        biography
        bornDate
      }
    }
  }
`;
const AuthorsTable = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) {
    return `Loading...`;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  if (data.authors.authors.length === 0) {
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
        {data.authors.authors.map((author: Author) => (
          <TableRow
            className="hover:cursor-pointer"
            key={author.id}
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
