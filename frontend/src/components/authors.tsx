import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AuthorsTable from "./authors-table";
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

const Authors = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) {
    return `Loading...`;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Authors</CardTitle>
        <CardDescription>Manage your books and their authors.</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthorsTable authors={data.authors.authors} />
      </CardContent>
    </Card>
  );
};

export default Authors;
