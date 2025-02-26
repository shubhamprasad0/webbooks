interface Author {
  id: number;
  name: string;
  biography: string;
  bornDate: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  author: Author;
}
