"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateBookDialog from "@/components/create-book-dialog";
import CreateAuthorDialog from "./create-author-dialog";
import { useState } from "react";
import Books from "./books";
import Authors from "./authors";
import { useRouter, useSearchParams } from "next/navigation";

const TabView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(searchParams.get("tab") || "books");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue={tab}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger
                  value="books"
                  onClick={() => {
                    setTab("books");
                    router.push("/?tab=books");
                  }}
                >
                  Books
                </TabsTrigger>
                <TabsTrigger
                  value="authors"
                  onClick={() => {
                    setTab("authors");
                    router.push("/?tab=authors");
                  }}
                >
                  Authors
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                {tab === "books" ? (
                  <CreateBookDialog />
                ) : (
                  <CreateAuthorDialog />
                )}
              </div>
            </div>
            <TabsContent value="books">
              <Books />
            </TabsContent>
            <TabsContent value="authors">
              <Authors />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TabView;
