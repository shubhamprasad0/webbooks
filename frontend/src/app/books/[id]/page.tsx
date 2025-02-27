"use client";

import { useParams } from "next/navigation";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      description
      publishedDate
      author {
        id
        name
      }
    }
    authors(limit: 100) {
      authors {
        id
        name
      }
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String
    $description: String
    $publishedDate: Date
    $authorId: ID
  ) {
    updateBook(
      id: $id
      title: $title
      description: $description
      publishedDate: $publishedDate
      authorId: $authorId
    ) {
      id
      title
      description
      publishedDate
      author {
        id
        name
      }
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const BookPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);
  const [authorId, setAuthorId] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.book) return <p>Book not found.</p>;
  if (!data?.authors) return <p>Authors not found</p>;

  const book = data.book;
  const authors = data.authors.authors;

  const handleUpdateBook = async () => {
    await updateBook({
      variables: {
        id: book.id,
        title: title || book.title,
        description: description || book.description,
        publishedDate: publishDate
          ? format(publishDate, "yyyy-MM-dd")
          : book.publishedDate,
        authorId: authorId || book.author.id,
      },
    });
    setIsEditing(false);
  };

  const handleDeleteBook = async () => {
    await deleteBook({
      variables: { id: book.id },
      refetchQueries: ["GetBooks"],
    });
    router.push("/?tab=books");
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold">Book Details</h1>

      {/* Book Title */}
      <div className="mt-4">
        <label className="block font-medium">Book Title</label>
        <Input
          value={title || book.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      {/* Book Description */}
      <div className="mt-4">
        <label className="block font-medium">Description</label>
        <Textarea
          value={description || book.description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      {/* Publish Date (Calendar Popover) */}
      <div className="mt-4">
        <label className="block font-medium">Published Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" disabled={!isEditing}>
              {publishDate ? publishDate.toDateString() : book.publishedDate}
            </Button>
          </PopoverTrigger>
          {isEditing && (
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  publishDate ? publishDate : new Date(book.publishedDate)
                }
                onSelect={setPublishDate}
                fromYear={1700}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
              />
            </PopoverContent>
          )}
        </Popover>
      </div>

      {/* Author Selection */}
      <div className="mt-4">
        <label className="block font-medium">Author</label>
        <Select
          onValueChange={(value) => setAuthorId(value)}
          defaultValue={book.author.id}
          disabled={!isEditing}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author: Author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex mt-6 flex-row justify-between">
        {isEditing ? (
          <>
            <Button onClick={handleUpdateBook}>Save</Button>
            <Button onClick={() => setIsEditing(false)} variant="destructive">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
        <Button onClick={handleDeleteBook} variant="destructive">
          Delete Book
        </Button>
      </div>
    </div>
  );
};

export default BookPage;
