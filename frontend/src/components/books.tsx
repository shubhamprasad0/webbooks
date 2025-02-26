"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateBookDialog } from "@/components/create-book-dialog";
import BooksTable from "@/components/books-table";
import useFetchBooks from "@/hooks/use-fetch-books";

const Books = () => {
  const { loading, error, books } = useFetchBooks();

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Books</TabsTrigger>
                <TabsTrigger value="yours">Authors</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <CreateBookDialog />
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Manage your books and their authors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BooksTable books={books} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="yours">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Manage your books and their authors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BooksTable books={books} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Books;
