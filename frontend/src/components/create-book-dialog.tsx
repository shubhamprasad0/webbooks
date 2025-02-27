import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS } from "./authors";

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $publishedDate: Date!
    $author: AuthorInput!
  ) {
    createBook(
      title: $title
      description: $description
      publishedDate: $publishedDate
      author: $author
    ) {
      id
      title
      description
      publishedDate
      author {
        id
        name
        biography
        bornDate
      }
    }
  }
`;

const CreateBookDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());
  const [selectedAuthor, setSelectedAuthor] = useState(0);
  const [creatingBook, setCreatingBook] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creatingAuthor, setCreatingAuthor] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [authorBornDate, setAuthorBornDate] = useState<Date | undefined>(
    new Date()
  );

  const [createBookMutation] = useMutation(CREATE_BOOK);
  const {
    data: authorData,
    loading: loadingAuthors,
    error: errorAuthors,
  } = useQuery(GET_AUTHORS);

  const reset = () => {
    setTitle("");
    setDescription("");
    setPublishDate(new Date());
    setSelectedAuthor(0);
    setCreatingAuthor(false);
    setAuthorName("");
    setAuthorBio("");
    setAuthorBornDate(new Date());
    setCreatingBook(false);
  };

  const createBook = async () => {
    setCreatingBook(true);
    let author = {};
    if (selectedAuthor) {
      author = { id: selectedAuthor };
    } else {
      author = {
        name: authorName,
        biography: authorBio,
        bornDate: format(authorBornDate!, "yyyy-MM-dd"),
      };
    }
    await createBookMutation({
      variables: {
        title,
        description,
        publishedDate: format(publishDate!, "yyyy-MM-dd"),
        author,
      },
      refetchQueries: ["GetBooks", "GetAuthors"],
    });
    reset();
    setDialogOpen(false);
  };

  if (loadingAuthors) return "Loading...";
  if (errorAuthors) return `Error ${errorAuthors}`;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Book
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-5xl md:max-w-3xl sm:max-w-lg max-h-[700px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new book.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-7"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-right">Publish Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full col-span-7 flex items-center justify-between"
                >
                  {publishDate
                    ? format(publishDate, "yyyy-MM-dd")
                    : "Select date"}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <Calendar
                  mode="single"
                  selected={publishDate}
                  onSelect={setPublishDate}
                  fromYear={1700}
                  toYear={new Date().getFullYear()}
                  captionLayout="dropdown"
                  defaultMonth={publishDate}
                  className="[&_.rdpc-caption>div:first-child]:hidden"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-right">Author</Label>
            <Select
              onValueChange={(val) =>
                val === "new"
                  ? setCreatingAuthor(true)
                  : setSelectedAuthor(+val)
              }
            >
              <SelectTrigger className="col-span-7">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {authorData.authors.authors.map((author: Author) => (
                  <SelectItem key={author.id} value={`${author.id}`}>
                    {author.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">Create New Author</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {creatingAuthor && (
            <>
              <div className="grid grid-cols-8 items-center gap-4">
                <Label htmlFor="authorName" className="text-right">
                  Author Name
                </Label>
                <Input
                  id="authorName"
                  className="col-span-7"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-8 items-center gap-4">
                <Label htmlFor="authorBio" className="text-right">
                  Biography
                </Label>
                <Textarea
                  id="authorBio"
                  className="col-span-7"
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-8 items-center gap-4">
                <Label className="text-right">Born Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full col-span-7 flex items-center justify-between"
                    >
                      {authorBornDate
                        ? format(authorBornDate, "yyyy-MM-dd")
                        : "Select date"}
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <Calendar
                      mode="single"
                      selected={authorBornDate}
                      onSelect={setAuthorBornDate}
                      fromYear={1700}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={createBook}
            disabled={
              !title ||
              !description ||
              !publishDate ||
              (!creatingAuthor && !selectedAuthor)
            }
          >
            {creatingBook ? (
              <Spinner size="small" className="mx-4" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookDialog;
