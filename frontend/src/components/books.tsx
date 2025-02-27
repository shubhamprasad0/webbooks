import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BooksTable from "@/components/books-table";
import useFetchBooks from "@/hooks/use-fetch-books";

const Books = () => {
  const { loading, error, books } = useFetchBooks();

  if (loading) {
    return `Loading...`;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Books</CardTitle>
        <CardDescription>Manage your books and their authors.</CardDescription>
      </CardHeader>
      <CardContent>
        <BooksTable books={books} />
      </CardContent>
    </Card>
  );
};

export default Books;
