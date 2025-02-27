import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AuthorsTable from "./authors-table";

const Authors = () => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Authors</CardTitle>
        <CardDescription>Manage your books and their authors.</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthorsTable />
      </CardContent>
    </Card>
  );
};

export default Authors;
