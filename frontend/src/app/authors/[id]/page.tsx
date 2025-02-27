"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      biography
      bornDate
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor(
    $id: ID!
    $name: String
    $biography: String
    $bornDate: Date
  ) {
    updateAuthor(
      id: $id
      name: $name
      biography: $biography
      bornDate: $bornDate
    ) {
      id
      name
      biography
      bornDate
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

const AuthorPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_AUTHOR, { variables: { id } });
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState<Date | undefined>(undefined);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.author) return <p>Author not found.</p>;

  const author = data.author;

  const handleUpdateAuthor = async () => {
    await updateAuthor({
      variables: {
        id: author.id,
        name: name || author.name,
        biography: biography || author.biography,
        bornDate: bornDate ? format(bornDate, "yyyy-MM-dd") : author.bornDate,
      },
    });
    setIsEditing(false);
  };

  const handleDeleteAuthor = async () => {
    await deleteAuthor({
      variables: { id: author.id },
      refetchQueries: ["GetAuthors", "GetBooks"],
    });
    router.push("/?tab=authors");
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold">Author Details</h1>

      <div className="mt-4">
        <label className="block font-medium">Name</label>
        <Input
          value={name || author.name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Biography</label>
        <Textarea
          value={biography || author.biography}
          onChange={(e) => setBiography(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Birth Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" disabled={!isEditing}>
              {bornDate ? bornDate.toDateString() : author.bornDate}
            </Button>
          </PopoverTrigger>
          {isEditing && (
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bornDate ? bornDate : new Date(author.bornDate)}
                onSelect={setBornDate}
              />
            </PopoverContent>
          )}
        </Popover>
      </div>

      <div className="flex mt-6 flex-row justify-between">
        {isEditing ? (
          <>
            <Button onClick={handleUpdateAuthor}>Save</Button>
            <Button onClick={() => setIsEditing(false)} variant="destructive">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
        <Button onClick={handleDeleteAuthor} variant="destructive">
          Delete Author
        </Button>
      </div>
    </div>
  );
};

export default AuthorPage;
