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
import { Button } from "./ui/button";

export const GET_AUTHORS = gql`
  query GetAuthors($limit: Int, $cursor: ID) {
    authors(limit: $limit, cursor: $cursor) {
      authors {
        id
        name
        biography
        bornDate
      }
      last
      totalCount
    }
  }
`;
const AuthorsTable = () => {
  const router = useRouter();
  const { loading, error, data, fetchMore } = useQuery(GET_AUTHORS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 5,
      cursor: 0,
    },
  });

  if (loading) {
    return `Loading...`;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  if (data.authors.authors.length === 0) {
    return <NoAuthors />;
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        cursor: data.authors.last,
      },
    });
  };

  return (
    <div>
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
      <div className="flex justify-center mt-4">
        {data.authors.authors.length < data.authors.totalCount && (
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthorsTable;
