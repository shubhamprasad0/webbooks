import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import useFetchAuthors from "@/hooks/use-fetch-authors";

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $biography: String, $bornDate: Date) {
    createAuthor(name: $name, biography: $biography, bornDate: $bornDate) {
      id
      name
      biography
      bornDate
    }
  }
`;

export default function CreateAuthorDialog() {
  const { setAuthors } = useFetchAuthors();
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState<Date | undefined>(new Date());
  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateAuthor = async () => {
    if (!name || !biography || !bornDate) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await createAuthor({
        variables: {
          name,
          biography,
          bornDate: format(bornDate, "yyyy-MM-dd"),
        },
      });

      setAuthors((prev) => {
        return [...prev, res.data.createAuthor];
      });

      setName("");
      setBiography("");
      setBornDate(new Date());
      setDialogOpen(false);
    } catch (err) {
      console.error("Error creating author:", err);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create Author</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Author</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Author Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />

          {/* Date Picker as Popover */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {bornDate ? format(bornDate, "PPP") : "Select Birthdate"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bornDate}
                onSelect={(date) => {
                  setBornDate(date);
                  setOpen(false);
                }}
                fromYear={1700}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>

          <Button onClick={handleCreateAuthor} disabled={loading}>
            {loading ? "Creating..." : "Create Author"}
          </Button>

          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
