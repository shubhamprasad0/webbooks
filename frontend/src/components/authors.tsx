import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useFetchAuthors from "@/hooks/use-fetch-authors";
import AuthorsTable from "./authors-table";

const Authors = () => {
  const { loading, error, authors } = useFetchAuthors();

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
        <AuthorsTable authors={authors} />
      </CardContent>
    </Card>
  );
};

export default Authors;
