"use client";

import TabView from "@/components/tab-view";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabView />{" "}
    </Suspense>
  );
}
