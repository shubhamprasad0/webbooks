"use client";

import { CreateBookDialog } from "./create-book-dialog";

export default function NoAuthors() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl mt-48 mb-2 font-bold tracking-tight">
          You have no authors
        </h3>
        <div className="mb-48">
          <CreateBookDialog />
        </div>
      </div>
    </div>
  );
}
